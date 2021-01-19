import axios from 'axios';
import createToken from '../createToken';
import config from 'config';

export const instance = axios.create({
	baseURL: config.API,
	timeout: 1000 * 300,
	headers: {},
});

const handleError = error => {
	if (error.response && error.response.status) {
		console.log('[Error handler] res:', error.response);
	}
	return Promise.reject(error);
};

const api = {
	get: async endpoint => {
		const header = await createToken()
		try {
			const response = await instance.get(endpoint, header);
			return Promise.resolve(response);
		} catch (error) {
			return handleError(error);
		}
	},
	post: async (endpoint, data) => {
		try {
			const response = await instance.post(endpoint, data);
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

export default api;
