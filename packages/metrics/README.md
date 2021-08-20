# `@auth-plus/metrics`

> TODO: description

## Usage

```js
import { MetricsSingleton } from '@auth-plus/metrics'

const metrics = MetricsSingleton.getInstance({
    type: 'prometheus',
    config: {
        prefix: 'your-system-name',
    },
})

metrics.createCounter('couter-test', 'help-description') 
// MetricsSingleton.getInstance().createCounter('couter-test', 'help-description')

metrics.incrementCounter('couter-test', 2)
// MetricsSingleton.getInstance().incrementCounter('couter-test', 2)

console.log(await metrics.getMetrics())
```
