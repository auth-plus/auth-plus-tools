import dotenv from 'dotenv'

export function loadEnvFile(path: string): Record<string, any> {
  dotenv.config({ path, encoding: 'utf8' })
  return process.env
}
