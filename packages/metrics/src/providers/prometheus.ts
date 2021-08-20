import client from 'prom-client'

import { Provider } from './interface'

export class Prometheus implements Provider {
  private registry: client.Registry
  private hashMap: Record<string, any>

  constructor(config: client.DefaultMetricsCollectorConfiguration) {
    this.registry = new client.Registry()
    client.collectDefaultMetrics({ ...config, register: this.registry })
    this.hashMap = {}
  }

  getMetrics(): Promise<string> {
    return this.registry.metrics()
  }

  createCounter(name: string, help: string): void {
    try {
      this.getInstance<client.Counter<string>>(`counter-${name}`)
    } catch (error) {
      const counter = new client.Counter({
        name,
        help,
        registers: [this.registry],
      })
      this.hashMap = { ...this.hashMap, [`counter-${name}`]: counter }
    }
  }

  incrementCounter(name: string, value: number): void {
    const instance = this.getInstance<client.Counter<string>>(`counter-${name}`)
    instance.inc(value)
  }

  createGauge(name: string, help: string): void {
    try {
      this.getInstance<client.Gauge<string>>(`gauge-${name}`)
    } catch (error) {
      const gauge = new client.Gauge({
        name,
        help,
        registers: [this.registry],
      })
      this.hashMap = { ...this.hashMap, [`gauge-${name}`]: gauge }
    }
  }

  incrementGauge(name: string, value: number): void {
    const instance = this.getInstance<client.Gauge<string>>(`gauge-${name}`)
    instance.inc(value)
  }

  decrementGauge(name: string, value: number): void {
    const instance = this.getInstance<client.Gauge<string>>(`gauge-${name}`)
    instance.dec(value)
  }

  createHistogram(
    name: string,
    help: string,
    buckets = [0.1, 5, 15, 50, 100, 500]
  ): void {
    try {
      this.getInstance<client.Histogram<string>>(`histogram-${name}`)
    } catch (error) {
      const histogram = new client.Histogram({
        name,
        help,
        buckets,
        registers: [this.registry],
      })
      this.hashMap = { ...this.hashMap, [`histogram-${name}`]: histogram }
    }
  }

  histogramObserve(name: string, value: number): void {
    const instance = this.getInstance<client.Histogram<string>>(
      `histogram-${name}`
    )
    instance.observe(value)
  }

  private getInstance<T>(name: string): T {
    const instance = this.hashMap[name] as T | undefined
    if (!instance) {
      throw new Error(`metric ${name} does not exist`)
    }
    return instance
  }
}
