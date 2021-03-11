const env = process.env.NODE_ENV || 'development';

const firebaseConfigDev = require('./firebase-config-dev.json')

const config = {
	development: {
		baseUrl: 'http://localhost:3000',
		API: 'http://localhost:3001',
		documentTitle: '[Dev] Stevent',
		firebaseConfig: firebaseConfigDev,
	},
	production: {
		baseUrl: 'https://stevent-302609.ts.r.appspot.com',
		API: 'https://stevent-backend-xh76qhhnwa-ts.a.run.app',
		documentTitle: 'Stevent',
		firebaseConfig: {
			apiKey: "AIzaSyDl8yW_FxdccX1JG4vqzJ_cTMYtFbQn-sM",
			authDomain: "stevent-302609.firebaseapp.com",
			databaseURL: "https://stevent-302609-default-rtdb.firebaseio.com",
			projectId: "stevent-302609",
			storageBucket: "stevent-302609.appspot.com",
			messagingSenderId: "957127772601",
			appId: "1:957127772601:web:0dc992dc90f21af6c24e68"
		},
	}
}

export const LANGUAGES = require('./languages.json');

export default config[env];
