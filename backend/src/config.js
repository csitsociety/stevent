require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

console.log('Running in environment: ', env)
const projectId = process.env.PROJECT_ID
const bucketName = process.env.BUCKET_NAME
const clientAddress = process.env.CLIENT_ADDRESS_REG
const firebaseServiceAccountDev = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.GOOGLE_APPLICATION_CREDENTIALS

// Warn about missing environment variables
if (env == 'development') {
    if (!projectId)
        throw new Error("Expected environment variable 'PROJECT_ID'")
    if (!bucketName)
        throw new Error("Expected environment variable 'BUCKET_NAME'")
    if (!firebaseServiceAccountDev)
        throw new Error("Expected environment variable 'FIREBASE_SERVICE_ACCOUNT' or 'GOOGLE_APPLICATION_CREDENTIALS'")
} else {
    if (!projectId)
        console.warn("Did not find 'PROJECT_ID' environment variable")
    if (!bucketName)
        console.warn("Did not find 'BUCKET_NAME' environment variable")
    if (!clientAddress)
        console.warn("Did not find 'CLIENT_ADDRESS_REG' environment variable")
} 

const config = {
	development: {
		client: clientAddress || '^http:\\/\\/localhost:3000$',
		port: process.env.PORT || 3001,
		projectId,
		bucketName,
		firebaseServiceAccount: firebaseServiceAccountDev
	},
	production: {
		client: clientAddress || '^https:\\/\\/stevent-302609\\.ts\\.r\\.appspot\\.com$',
		port: process.env.PORT || 8080,
		projectId: projectId || 'stevent-backend',
		bucketName: bucketName || 'stevent-backend-image-store',
		firebaseServiceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS,
	},
};

module.exports = config[env];
