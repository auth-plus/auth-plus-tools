export interface Provider {
  getMetrics: () => Promise<string>
  createCounter: (name: string, help: string) => void
  incrementCounter: (name: string, value: number) => void
  createGauge: (name: string, help: string) => void
  incrementGauge: (name: string, value: number) => void
  decrementGauge: (name: string, value: number) => void
  createHistogram: (name: string, help: string) => void
  histogramObserve: (name: string, value: number) => void
}
