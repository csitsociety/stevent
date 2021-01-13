import api from 'services';

export const login = async (username, password) => {
	try {
		const request = await api.post(`/login`, {
			username,
			password,
		});

		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err;
	}
};
