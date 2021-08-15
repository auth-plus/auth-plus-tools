import { logger } from 'firebase-functions'
import Transport, { TransportStreamOptions } from 'winston-transport'

export class FirebaseTransport extends Transport {
  constructor(opts: TransportStreamOptions) {
    super(opts)
  }

  log(info: any, callback: () => void): any {
    setImmediate(() => {
      this.emit('logged', info)
    })
    const { message, level, ...meta } = info
    switch (level) {
      case 'info':
        logger.write({ severity: 'INFO', message: message, extra: meta })
        break
      case 'warn':
        logger.write({ severity: 'WARNING', message: message, extra: meta })
        break
      case 'error': {
        logger.write({ severity: 'ERROR', message: message, extra: meta })
        break
      }
      default:
        break
    }
    callback()
  }
}
