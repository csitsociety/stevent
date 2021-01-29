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

export const getEventDetails = async payload => {
	try {
		const request = await api.get(`/retrieveEventDetails`, payload);
		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err
	}
};

export const createClubEvent = async payload => {
	try {
		const request = await api.post(`/createClubEvent`, payload, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err
	}
};

export const retrieveAttendees = async payload => {
	try {
		const request = await api.get(`/retrieveAttendees`, payload);
		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err
	}
};

export const updateAttendingEvent = async payload => {
	try {
		const request = await api.post(`/updateAttendingEvent`, payload);
		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err
	}
};
