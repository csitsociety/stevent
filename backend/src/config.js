require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

console.log('Running in environment: ', env)
const projectIdDev = process.env.PROJECT_ID
const bucketNameDev = process.env.BUCKET_NAME
const firebaseServiceAccountDev = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.GOOGLE_APPLICATION_CREDENTIALS

// Warn about missing environment variables
if (env == 'development') {
    if (!projectIdDev)
        throw new Error("Expected environment variable 'PROJECT_ID'")
    if (!bucketNameDev)
        throw new Error("Expected environment variable 'BUCKET_NAME'")
    if (!firebaseServiceAccountDev)
        throw new Error("Expected environment variable 'FIREBASE_SERVICE_ACCOUNT' or 'GOOGLE_APPLICATION_CREDENTIALS'")
} else {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS)
        throw new Error("Expected environment variabke 'GOOGLE_APPLICATION_CREDENTIALS'")
} 


const config = {
	development: {
		client: 'http://localhost:3000',
		port: process.env.PORT || 3001,
		projectId: projectIdDev,
		bucketName: bucketNameDev,
		firebaseServiceAccount: firebaseServiceAccountDev
	},
	production: {
		client: 'https://stevent-302609.ts.r.appspot.com',
		port: 8080,
		projectId: 'stevent-backend',
		bucketName: 'stevent-backend-image-store',
		firebaseServiceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS,
	},
};

module.exports = config[env];
