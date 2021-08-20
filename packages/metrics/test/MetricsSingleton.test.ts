import { MetricsSingleton } from '../src'
import { expect } from 'chai'
describe('testing MetricsSingleton', () => {
  it('should increment counter', async () => {
    const metrics = MetricsSingleton.getInstance({
      type: 'prometheus',
      config: {
        prefix: 'your_system_name',
      },
    })

    metrics.createCounter('couter_test', 'help_description')
    metrics.incrementCounter('couter_test', 2)

    const result = await metrics.getMetrics()
    expect(result).to.match(/couter_test 2/)
  })
})
