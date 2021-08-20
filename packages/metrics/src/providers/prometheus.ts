import client from 'prom-client'

import { Provider } from './interface'

export class Prometheus implements Provider {
  private registry: client.Registry
  private hashMap: Record<string, any>

  constructor(config: client.DefaultMetricsCollectorConfiguration) {
    client.collectDefaultMetrics(config)
    this.registry = new client.Registry()
    this.hashMap = {}
  }

  getMetrics(): Promise<string> {
    return this.registry.metrics()
  }

  createCounter(name: string, help: string): void {
    const instance = this.getInstance<client.Counter<string>>(`counter-${name}`)
    if (!instance) {
      const counter = new client.Counter({
        name,
        help,
      })
      this.hashMap[`counter-${name}`] = counter
    }
  }

  incrementCounter(name: string, value: number): void {
    const instance = this.getInstance<client.Counter<string>>(`counter-${name}`)
    instance?.inc(value)
  }

  createGauge(name: string, help: string): void {
    const instance = this.getInstance<client.Gauge<string>>(`gauge-${name}`)
    if (!instance) {
      const gauge = new client.Gauge({
        name,
        help,
      })
      this.hashMap[`gauge-${name}`] = gauge
    }
  }

  incrementGauge(name: string, value: number): void {
    const instance = this.getInstance<client.Gauge<string>>(`gauge-${name}`)
    instance?.inc(value)
  }

  decrementGauge(name: string, value: number): void {
    const instance = this.getInstance<client.Gauge<string>>(`gauge-${name}`)
    instance?.dec(value)
  }

  createHistogram(
    name: string,
    help: string,
    buckets = [0.1, 5, 15, 50, 100, 500]
  ): void {
    const instance = this.getInstance<client.Histogram<string>>(
      `histogram-${name}`
    )
    if (!instance) {
      const histogram = new client.Histogram({
        name,
        help,
        buckets,
      })
      this.hashMap[`histogram-${name}`] = histogram
    }
  }

  histogramObserve(name: string, value: number): void {
    const instance = this.getInstance<client.Histogram<string>>(
      `histogram-${name}`
    )
    instance?.observe(value)
  }

  private getInstance<T>(name: string): T | null {
    return this.hashMap[name] ?? null
  }
}
