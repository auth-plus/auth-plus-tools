/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston'
import { NodeOptions } from '@sentry/node'
import Transport from 'winston-transport'
import { SentryTransport } from './transports/sentry'
import { FirebaseTransport } from './transports/firebase'

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

export default class LoggerSingleton {
  private static instance: LoggerSingleton
  private static transport: Transport[] = []
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
    }

    return LoggerSingleton.instance
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
    return LoggerSingleton.instance
  }

  public addFirebase(): LoggerSingleton {
    LoggerSingleton.logger.add(
      new FirebaseTransport({
        format: winston.format.simple(),
      })
    )
    return LoggerSingleton.instance
  }

  private validateTransport(): boolean {
    return LoggerSingleton.transport.length !== 0
  }

  private log(level: Levels, msg: any): void {
    if (!this.validateTransport()) {
      throw new Error('No transport added')
    }
    LoggerSingleton.logger.log(level, msg)
  }
  public emerg(msg: any): void {
    this.log('emerg', msg)
  }
  public alert(msg: any): void {
    this.log('alert', msg)
  }
  public crit(msg: any): void {
    this.log('crit', msg)
  }
  public error(msg: any): void {
    this.log('error', msg)
  }
  public warning(msg: any): void {
    this.log('warning', msg)
  }
  public warn(msg: any): void {
    this.log('warn', msg)
  }
  public notice(msg: any): void {
    this.log('notice', msg)
  }
  public info(msg: any): void {
    this.log('info', msg)
  }
  public http(msg: any): void {
    this.log('http', msg)
  }
  public verbose(msg: any): void {
    this.log('verbose', msg)
  }
  public debug(msg: any): void {
    this.log('debug', msg)
  }
  public silly(msg: any): void {
    this.log('silly', msg)
  }
}
