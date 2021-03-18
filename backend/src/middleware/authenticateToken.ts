import admin from '../services/firebaseAdmin'

import { Middleware } from './middleware.d'

const decodeIDToken: Middleware = async (req, res, next) => {
  const header = req.headers.authorization
  if (header && header !== 'Bearer null' && header.startsWith('Bearer ')) {
    const idToken = header.split('Bearer ')[1]
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken)
      req.currentUser = decodedToken
    } catch (err) {
      console.log(err)
    }
  }

  return next()
}

export default decodeIDToken
