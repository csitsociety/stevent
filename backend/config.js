require('dotenv').config();
const env = process.env.REACT_APP_ENV || 'development';

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
		client: '',
		port: 80,
		projectId: '',
	},
};

module.exports = config[env];
