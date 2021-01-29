import axios from 'axios';
import { createToken } from 'auth';
import config from 'config';

export const instance = axios.create({
	baseURL: config.API,
	timeout: 1000 * 300,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(async config => {
	const token = await createToken();
	if (token) {
		config.headers.Authorization = token;
	}
	return config;
});

const handleError = error => {
	if (error.response && error.response.status) {
		console.log('[Error handler] res:', error.response);
	}
	return Promise.reject(error);
};

const api = {
	get: async (endpoint, data) => {
		try {
			const response = await instance.get(endpoint, { params: data });
			return Promise.resolve(response);
		} catch (error) {
			return handleError(error);
		}
	},
	post: async (endpoint, data, options = {}) => {
		try {
			const response = await instance.post(endpoint, data, options);
			return Promise.resolve(response);
		} catch (error) {
			return handleError(error);
		}
	},
	put: async (endpoint, data) => {
		try {
			const response = await instance.put(endpoint, data);
			return Promise.resolve(response);
		} catch (error) {
			return handleError(error);
		}
	},
	patch: async (endpoint, data) => {
		try {
			const response = await instance.patch(endpoint, data);
			return Promise.resolve(response);
		} catch (error) {
			return handleError(error);
		}
	},
};

export * from './user';
export * from './images';
export * from './clubs';
export * from './events';

export default api;
