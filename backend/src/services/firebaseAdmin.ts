import admin from 'firebase-admin'
import config from '../config'

if (process.env.NODE_ENV === 'production') {
  admin.initializeApp()
} else {
  const serviceAccount = config.firebaseServiceAccount
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export default admin
