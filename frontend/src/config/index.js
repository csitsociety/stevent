const env = process.env.REACT_APP_ENV || 'development';

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
	staging: {
		baseUrl: '',
		API: '',
		documentTitle: '[UAT] Stevent',
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
		baseUrl: '',
		API: '',
		documentTitle: 'Stevent',
		firebaseConfig: {
	    apiKey: "",
	    authDomain: "",
	    projectId: "",
	    storageBucket: "",
	    messagingSenderId: "",
	    appId: "",
	  },
	},
};

export default config[env];
