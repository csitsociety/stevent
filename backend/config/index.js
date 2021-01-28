require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		client: 'http://localhost:3000',
		port: 3001,
		projectId: process.env.PROJECT_ID,
		uploadBucketName: process.env.UPLOAD_BUCKET_NAME,
		accessBucketName: process.env.ACCESS_BUCKET_NAME,
		firebaseServiceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS
	},
	production: {
		client: 'https://stevent-302609.ts.r.appspot.com',
		port: 8080,
		projectId: 'stevent-backend',
		uploadBucketName: 'stevent-backend-temp-image-store',
		accessBucketName: 'stevent-backend-image-store',
		firebaseServiceAccount: './config/stevent-backend.json',
	},
};

module.exports = config[env];
