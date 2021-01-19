import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "***REMOVED***",
    authDomain: "stevent-development-rmit.firebaseapp.com",
    projectId: "stevent-development-rmit",
    storageBucket: "stevent-development-rmit.appspot.com",
    messagingSenderId: "***REMOVED***",
    appId: "***REMOVED***"
  };

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  
  const fire = firebase;
  export default fire;