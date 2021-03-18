import cors from 'cors'
import express, { Application } from 'express'
import path from 'path'
import session from 'express-session'
import multer from 'multer'
import { DatastoreStore } from '@google-cloud/connect-datastore'

import decodeIDToken from './middleware/authenticateToken'
import { datastore } from './services/datastore'

export const addMiddleware = (app: Application): Application => {
  // Setup CORS
  //  app.options('*', cors())
  app.use(cors())

  // Add static file handlers
  app.use(express.static(path.join(__dirname, 'index.html')))
  app.use(express.static(path.join(__dirname, '/public')))

  // Setup token decoding and auth
  app.enable('trust proxy')
  app.use(decodeIDToken)
  app.disable('x-powered-by')

  // Setup multer for form data parsing
  app.use(
    multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }).any()
  )

  // Add parsers for body data
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Add session middleware
  app.use(
    session({
      store: new DatastoreStore({
        kind: 'express-sessions',
        expirationMs: 1825 * 86400 * 1000,
        dataset: datastore,
      }),
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1825 * 86400 * 1000,
        httpOnly: false,
      },
    })
  )

  return app
}
