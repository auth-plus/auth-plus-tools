import { LoggerSingleton } from './LoggerSingleton'

interface StandartLogger {
  log: (msg: string) => void
  info?: (msg: string) => void
}

export function LogMethod(logger?: StandartLogger) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      const msg = `${propertyKey} (${JSON.stringify(args)})`
      if (logger) {
        if (logger.info) {
          logger.info(msg)
        } else {
          logger.log(msg)
        }
      } else {
        console.warn('no logger')
        console.warn(LoggerSingleton.getInstance().getTranportLength())
        if (LoggerSingleton.getInstance().getTranportLength() === 0) {
          LoggerSingleton.getInstance().addConsole()
        }
        console.warn(LoggerSingleton.getInstance().getTranportLength())

        LoggerSingleton.getInstance().info(msg)
      }
      return originalMethod.apply(this, args)
    }
    return descriptor
  }
}
