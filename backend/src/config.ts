import dotenv from 'dotenv'

// Init
dotenv.config()

// Determine evn
const env = process.env.NODE_ENV || 'development'
console.log('Using config for environment: ', env)

type ConfigOption = {
  envVar: string
  defaultValue?: number | string
}

const configOptions: Record<string, ConfigOption> = {
  client: {
    envVar: 'CLIENT_ADDRESS',
    defaultValue: 'http://localhost:3000',
  },
  port: {
    envVar: 'PORT',
    defaultValue: 8080,
  },
  projectId: {
    envVar: 'PROJECT_ID',
    defaultValue: 'stevent-302609',
  },
  bucketName: {
    envVar: 'BUCKET_NAME',
    defaultValue: 'stevent-backend-image-store',
  },
  firebaseServiceAccount: {
    envVar: 'GOOGLE_APPLICATION_CREDENTIALS',
  },
}

const configPairs = Object.entries(configOptions).map(([name, option]) => {
  if (process.env[option.envVar] !== undefined) {
    return [name, process.env[option.envVar]]
  } else {
    if (option.defaultValue !== undefined) {
      if (env !== 'development') {
        console.warn(`Using default value for config option ${name} of ${option.defaultValue}`)
      }
      return [name, option.defaultValue]
    } else {
      throw new Error(`Expected environment variable "${option.envVar}"`)
    }
  }
})

const config = Object.fromEntries(configPairs)
export default config
