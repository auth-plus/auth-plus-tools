/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston'
import { NodeOptions } from '@sentry/node'
import { SentryTransport } from './transports/sentry'

export type Levels =
  | 'emerg'
  | 'alert'
  | 'crit'
  | 'error'
  | 'warn'
  | 'warning'
  | 'notice'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly'

export class LoggerSingleton {
  private static instance: LoggerSingleton
  private static transportCount: number
  private static logger: winston.Logger

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): LoggerSingleton {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = new LoggerSingleton()
      LoggerSingleton.logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.errors({ stack: true }),
          winston.format.timestamp()
        ),
      })
      LoggerSingleton.transportCount = 0
    }

    return LoggerSingleton.instance
  }

  public getTranportLength(): number {
    return LoggerSingleton.transportCount
  }

  public addSentry(props: NodeOptions): LoggerSingleton {
    LoggerSingleton.logger.add(
      new SentryTransport(
        {
          format: winston.format.simple(),
        },
        props
      )
    )
    LoggerSingleton.transportCount++
    return LoggerSingleton.instance
  }

  public addConsole(): LoggerSingleton {
    LoggerSingleton.logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    )
    LoggerSingleton.transportCount++
    return LoggerSingleton.instance
  }

  public log(msg: any, level?: Levels): void {
    if (LoggerSingleton.transportCount === 0) {
      throw new Error('No transport added')
    }
    LoggerSingleton.logger.log(level ?? 'info', msg)
  }
  public emerg(msg: any): void {
    this.log(msg, 'emerg')
  }
  public alert(msg: any): void {
    this.log(msg, 'alert')
  }
  public crit(msg: any): void {
    this.log(msg, 'crit')
  }
  public error(msg: any): void {
    this.log(msg, 'error')
  }
  public warning(msg: any): void {
    this.log(msg, 'warning')
  }
  public warn(msg: any): void {
    this.log(msg, 'warn')
  }
  public notice(msg: any): void {
    this.log(msg, 'notice')
  }
  public info(msg: any): void {
    this.log(msg, 'info')
  }
  public http(msg: any): void {
    this.log(msg, 'http')
  }
  public verbose(msg: any): void {
    this.log(msg, 'verbose')
  }
  public debug(msg: any): void {
    this.log(msg, 'debug')
  }
  public silly(msg: any): void {
    this.log(msg, 'silly')
  }
}
