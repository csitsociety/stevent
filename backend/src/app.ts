import express from 'express'

import { addRoutes } from './routes'
import { addMiddleware } from './middleware'

// Create and setup app
const app = express()
addMiddleware(app)
addRoutes(app)

// Setup top level route
app.get('/', function (req, res) {
  res.send(`<pre>Stevent API - 2021</pre>`)
})

export default app
