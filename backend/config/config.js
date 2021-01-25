require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		client: 'http://localhost:3000',
		port: 3001,
		projectId: process.env.PROJECT_ID || 'stevent-development-rmit',
		serviceAccount: {
			type: "service_account",
			project_id: "stevent-development-rmit",
			private_key_id: "2853c606d404a84a6b4da4bfcc558b64a6c0d215",
			private_key: "***REMOVED***",
			client_email: "firebase-adminsdk-h7i10@stevent-development-rmit.iam.gserviceaccount.com",
			client_id: "100418932302977828585",
			auth_uri: "https://accounts.google.com/o/oauth2/auth",
			token_uri: "https://oauth2.googleapis.com/token",
			auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
			client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h7i10%40stevent-development-rmit.iam.gserviceaccount.com"
		},
	},
	production: {
		client: 'https://stevent-302609.ts.r.appspot.com',
		port: 8080,
		projectId: 'stevent-backend',
		serviceAccount: {
		  type: "service_account",
		  project_id: "stevent-302609",
		  private_key_id: "***REMOVED***",
		  private_key: "***REMOVED***",
		  client_email: "***REMOVED***",
		  client_id: "***REMOVED***",
		  auth_uri: "https://accounts.google.com/o/oauth2/auth",
		  token_uri: "https://oauth2.googleapis.com/token",
		  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		  client_x509_cert_url: "***REMOVED***"
		},
	},
};

module.exports = config[env];
