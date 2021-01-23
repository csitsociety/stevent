import firebase from 'firebase';
import config from 'config';

try {
  firebase.initializeApp(config.firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default firebase;
