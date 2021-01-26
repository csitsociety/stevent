import api from 'services';

export const retrieveClubDetails = async payload => {
	try {
		const request = await api.get(`/retrieveClubDetails`, payload);
		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err;
	}
};