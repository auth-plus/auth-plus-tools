# `@auth-plus/logger`

> Logger lib based on winston, but much more easy to use

## Usage

```js
import { LoggerSingleton as logger } from '@auth-plus/logger'

logger.getInstance().addConsole()
logger.info('info-string')
logger.log('message','error') // = logger.error('message')

//Shortcut with decorator

import { LogMethod } from '@auth-plus/logger'

class Test {

    @LogMethod(console) // you can pass any logger as console, winston
    method1() {
        return 'm1'
    }

    @LogMethod(console)
    method2(input: string) {
        return input
    }
}

t.method1() // method1 ([])
t.method2('m2', { a: 1, b: '2', c: [3] }) // method2 (["m2",{"a":1,"b":"2","c":[3]}])

class Test2 {
    @LogMethod() //or nothing
    method1() {
        return 'm1'
    }

    @LogMethod()
    method2(input: string) {
        return input
    }
}


const t = new Test2()
t.method1() //info: method1 ([]) {"timestamp":"2021-08-20T16:01:49.886Z"}
t.method2('m2', { a: 1, b: '2', c: [3] }) // info: method2 (["m2"]) {"timestamp":"2021-08-20T16:01:49.887Z"}
```
