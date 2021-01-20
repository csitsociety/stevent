export const uploadImage = async payload => {
	try {
		const request = await api.post(`/uploadImage`, payload);

		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err;
	}
};

export const downloadImage = async payload => {
	try {
		const request = await api.post(`/downloadImage`, payload);

		if (request.status === 200) {
			return request.data;
		}
	} catch (err) {
		throw err;
	}
};