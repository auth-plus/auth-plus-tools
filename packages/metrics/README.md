# `@auth-plus/metrics`

> TODO: description

## Usage

```js
import { MetricsSingleton } from '@auth-plus/metrics'

MetricsSingleton.getInstance({ prefix: 'your-system-name' })

MetricsSingleton.createCounter('couter-test', 'help-description')
MetricsSingleton.incrementCounter('couter-test', 2)

console.log(await MetricsSingleton.getMetrics())
```
