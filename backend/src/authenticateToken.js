const admin = require('firebase-admin');
const config = require('./config');

if (process.env.NODE_ENV === 'production') {
    admin.initializeApp();
} else {
    const serviceAccount = config.firebaseServiceAccount
    console.log(serviceAccount)
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

async function decodeIDToken(req, res, next) {
  const header = req.headers.authorization;
  if (header && header !== 'Bearer null' && header.startsWith('Bearer ')) {
    const idToken = header.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}

module.exports = decodeIDToken;
