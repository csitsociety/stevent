const env = process.env.REACT_APP_ENV || 'development';

const config = {
	development: {
		baseUrl: 'http://localhost:3000',
		API: 'http://localhost:3001',
		documentTitle: '[Dev] Stevent',
	},
	staging: {
		baseUrl: '',
		API: '',
		documentTitle: '[UAT] Stevent',
	},
	production: {
		baseUrl: '',
		API: '',
		documentTitle: 'Stevent',
	},
};

export default config[env];
