import * as Sentry from '@sentry/node'
import Transport, { TransportStreamOptions } from 'winston-transport'

export class SentryTransport extends Transport {
  constructor(opts: TransportStreamOptions, sentryConfig?: Sentry.NodeOptions) {
    super(opts)
    Sentry.init(sentryConfig)
  }

  log(info: any, callback: () => void): any {
    setImmediate(() => {
      this.emit('logged', info)
    })
    const { message, level, ...meta } = info
    const sentryLevel: Sentry.Severity = level
    if (
      [
        Sentry.Severity.Error,
        Sentry.Severity.Critical,
        Sentry.Severity.Fatal,
      ].some((level) => level === sentryLevel)
    ) {
      Sentry.captureException(message, meta)
    } else {
      Sentry.captureMessage(message, sentryLevel)
    }
    callback()
  }
}
