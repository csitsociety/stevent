import api from 'services';

export const retrieveEventsFeed = async payload => {
	try {
        const request = await api.get(`/retrieveEventsFeed`, payload);
		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err
	}
};