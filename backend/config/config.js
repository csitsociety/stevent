require('dotenv').config();
const env = 'production';

const config = {
	development: {
		client: 'http://localhost:3000',
		port: 3001,
		projectId: process.env.PROJECT_ID || 'stevent-development-rmit',
	},
	staging: {
		client: '',
		port: 80,
		projectId: '', 
	},
	production: {
		client: 'https://stevent-302609.ts.r.appspot.com',
		port: 8080,
		projectId: 'stevent-backend',
	},
};

module.exports = config[env];
