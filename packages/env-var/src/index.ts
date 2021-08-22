import { loadEnvFile } from './envFile'
import { loadGcpSecret } from './gcpSecretManager'

type ProfileType = 'env_file' | 'gcp_secret_manager'

export interface Profile {
  type: ProfileType
  config?: any
}

export class EnvVarSingleton {
  private static instance: EnvVarSingleton
  private environmentVar: Record<string, any>

  private constructor(profile: Profile) {
    switch (profile.type) {
      case 'env_file':
        this.environmentVar = loadEnvFile(profile.config)
        break
      case 'gcp_secret_manager':
        this.environmentVar = loadGcpSecret(profile.config)
        break
      default:
        throw new Error(
          'Profile type not supported, please se https://github.com/auth-plus/auth-plus-tools/tree/main/packages/env-var'
        )
    }
  }

  public static getInstance(profile: Profile) {
    if (!EnvVarSingleton.instance) {
      EnvVarSingleton.instance = new EnvVarSingleton(profile)
    }
    return EnvVarSingleton.instance
  }

  getEnvironment<T>(): T {
    return this.environmentVar as T
  }
}
