import { expect } from 'chai'

import { MetricsSingleton } from '../src'

describe('MetricsSingleton', () => {
  const metrics = MetricsSingleton.getInstance({
    type: 'prometheus',
    config: {
      prefix: 'your_system_name',
    },
  })

  afterEach(() => {
    metrics.reset()
  })

  it('should increment counter', async () => {
    metrics.createCounter('couter_test', 'help_description')
    metrics.incrementCounter('couter_test', 2)
    const result = await metrics.getMetrics()
    expect(result).to.match(/couter_test 2/)
  })

  it('should increment gauge', async () => {
    metrics.createGauge('gauge_test', 'help_description')
    metrics.incrementGauge('gauge_test', 2)
    const result = await metrics.getMetrics()
    expect(result).to.match(/gauge_test 2/)
  })

  it('should decrement gauge', async () => {
    metrics.createGauge('gauge_test', 'help_description')
    metrics.decrementGauge('gauge_test', 2)
    const result = await metrics.getMetrics()
    expect(result).to.match(/gauge_test -2/)
  })

  it('should observe on histogram', async () => {
    metrics.createHistogram('histogram_test', 'help_description')
    metrics.histogramObserve('histogram_test', 2)
    const result = await metrics.getMetrics()
    expect(result).to.match(/histogram_test_bucket{le="5"} 1/)
  })
})
