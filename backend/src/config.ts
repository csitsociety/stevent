import dotenv from 'dotenv'

// Init
dotenv.config()

// Determine evn
const env = process.env.NODE_ENV || 'production'
console.log('Using config for environment: ', env)

type ConfigOption = {
  envVar: string
  defaultValue?: number | string
}

const configOptions: Record<string, ConfigOption> = {
  client: {
    envVar: 'CLIENT_ADDRESS',
    defaultValue: 'https://stevent.club/',
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
    defaultValue: 'stevent-302609',
  },
  firebaseServiceAccount: {
    envVar: 'GOOGLE_APPLICATION_CREDENTIALS',
  },
}

const configPairs = Object.entries(configOptions).map(([name, option]) => {
  if (env == "development") {
    if (process.env[option.envVar] == undefined) {
      throw new Error(`Expected environment variable "${option.envVar}"`)
    }
    return [name, process.env[option.envVar]]
  } else {
    return [name, option.defaultValue]
  }
})

const config = Object.fromEntries(configPairs)
export default config
