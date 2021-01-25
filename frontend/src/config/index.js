const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		baseUrl: 'http://localhost:3000',
		API: 'http://localhost:3001',
		documentTitle: '[Dev] Stevent',
		firebaseConfig: {
	    apiKey: "***REMOVED***",
	    authDomain: "stevent-development-rmit.firebaseapp.com",
	    projectId: "stevent-development-rmit",
	    storageBucket: "stevent-development-rmit.appspot.com",
	    messagingSenderId: "***REMOVED***",
	    appId: "***REMOVED***",
	  },
	},
	production: {
		baseUrl: 'https://stevent-302609.ts.r.appspot.com',
		API: 'https://stevent-backend.ts.r.appspot.com',
		documentTitle: 'Stevent',
		firebaseConfig: {
			apiKey: "***REMOVED***",
			authDomain: "stevent-302609.firebaseapp.com",
			databaseURL: "https://stevent-302609-default-rtdb.firebaseio.com",
			projectId: "stevent-302609",
			storageBucket: "stevent-302609.appspot.com",
			messagingSenderId: "***REMOVED***",
			appId: "***REMOVED***"
		}
	}
}

export default config[env];
