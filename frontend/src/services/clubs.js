import api from 'services';

export const retrieveClubs = async payload => {
	try {
		const request = await api.get(`/retrieveClubs`, payload);
		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err
	}
};

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