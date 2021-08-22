export function loadGcpSecret(path: string): Record<string, any> {
  dotenv.config({ path, encoding: 'utf8' })
  return process.env
}
