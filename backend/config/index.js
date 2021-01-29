require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		client: 'http://localhost:3000',
		port: 3001,
		projectId: process.env.PROJECT_ID,
		bucketName: process.env.BUCKET_NAME,
		firebaseServiceAccount: './config/stevent-development-rmit.json',
	},
	production: {
		client: 'https://stevent-302609.ts.r.appspot.com',
		port: 8080,
		projectId: 'stevent-backend',
		bucketName: 'stevent-backend-image-store',
		firebaseServiceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS || './config/stevent-backend.json',
	},
};

module.exports = config[env];
