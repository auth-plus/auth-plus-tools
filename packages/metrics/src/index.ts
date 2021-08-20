import { Provider } from './providers/interface'
import { Prometheus } from './providers/prometheus'

type providerList = 'prometheus'

interface Profile {
  type: providerList
  config: any
}

export class MetricsSingleton {
  private static instance: MetricsSingleton
  private static provider: Provider

  private constructor(profile: Profile) {
    if (profile.type === 'prometheus') {
      MetricsSingleton.provider = new Prometheus(profile.config)
    }
  }

  public static getInstance(config: any): MetricsSingleton {
    if (!MetricsSingleton.instance) {
      MetricsSingleton.instance = new MetricsSingleton(config)
    }
    return MetricsSingleton.instance
  }

  getMetrics(): Promise<string> {
    return MetricsSingleton.provider.getMetrics()
  }
  createCounter(name: string, help: string): void {
    return MetricsSingleton.provider.createCounter(name, help)
  }
  incrementCounter(name: string, value: number): void {
    return MetricsSingleton.provider.incrementCounter(name, value)
  }
  createGauge(name: string, help: string): void {
    return MetricsSingleton.provider.createGauge(name, help)
  }
  incrementGauge(name: string, value: number): void {
    return MetricsSingleton.provider.incrementGauge(name, value)
  }
  decrementGauge(name: string, value: number): void {
    return MetricsSingleton.provider.decrementGauge(name, value)
  }
  createHistogram(name: string, help: string): void {
    return MetricsSingleton.provider.createHistogram(name, help)
  }
  histogramObserve(name: string, value: number): void {
    return MetricsSingleton.provider.histogramObserve(name, value)
  }
}
