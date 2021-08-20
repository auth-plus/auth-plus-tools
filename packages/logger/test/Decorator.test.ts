import { LogMethod } from '../src/'

describe('testing decorator', () => {
  it('should log when execute method with native console', () => {
    class Test {
      @LogMethod(console)
      method1() {
        return 'm1'
      }
      @LogMethod(console)
      method2(input: string, obj: Record<string, any>) {
        return input
      }
    }

    const t = new Test()
    t.method1()
    t.method2('m2', { a: 1, b: '2', c: [3] })
  })

  it('should log when execute method with LoggerSingleton', () => {
    class Test {
      @LogMethod()
      method1() {
        return 'm1'
      }
      @LogMethod()
      method2(input: string) {
        return input
      }
    }

    const t = new Test()
    t.method1()
    t.method2('m2')
  })
})
