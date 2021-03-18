import config from './src/config'
import app from './src/app'

// Start listening
app.listen(config.port, () => {
  console.log(`Stevent API now listening on port ${config.port}`)
})
