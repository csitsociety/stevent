import express from 'express'

import { addRoutes } from './src/routes'
import { addMiddleware } from './src/middleware'
import config from './src/config'

// Create and setup app
const app = express()
addMiddleware(app)
addRoutes(app)

// Setup top level route
app.get('/', function (req, res) {
  res.send(`<pre>Stevent API - 2021</pre>`)
})

// Start listening
app.listen(config.port, () => {
  console.log(`Stevent API now listening on port ${config.port}`)
})
