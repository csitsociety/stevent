import axios from 'axios';
import { createToken } from 'auth';
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
	get: async (endpoint, data) => {
		const header = await createToken()
		try {
			const response = await instance.get(endpoint, {params: data, headers: header});
			return Promise.resolve(response);
		} catch (error) {
			return handleError(error);
		}
	},
	post: async (endpoint, data) => {
		const header = await createToken()
		try {
			const response = await instance.post(endpoint, data, header);
			return Promise.resolve(response);
		} catch (error) {
			return handleError(error);
		}
	},
	put: async (endpoint, data) => {
		const header = await createToken()
		try {
			const response = await instance.put(endpoint, data, header);
			return Promise.resolve(response);
		} catch (error) {
			return handleError(error);
		}
	},
	patch: async (endpoint, data) => {
		const header = await createToken()
		try {
			const response = await instance.patch(endpoint, data, header);
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
