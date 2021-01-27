const uploadImage = require('../uploadImage');

module.exports = function(app, datastore) {
	app.post('/createClubEvent', async (req, res) => {
		const { name, date, hostingClubs, description } = req.body;
		const image = req.files[0];

		if (name.length == 0
			|| date.length == 0
			|| hostingClubs.length == 0
			|| description.length == 0
			|| !image
		) {
			res.json({
				success: false,
				errors: {
					main: "Invalid event details"
				}
			})
			return
		}

		try {
			const imageUrl = await uploadImage(image);
			const key = (await datastore.allocateIds(datastore.key('Event'), 1))[0][0];
			const entity = {
				key,
				data: {
					name,
					image: imageUrl,
					date: parseInt(date),
					hostingClubs: JSON.parse(hostingClubs),
					description,
					finished: false,
				}
			}
			datastore.upsert(entity)
			res.json({
				success: true,
				key,
			})
		} catch (e) {
			res.json({
				success: false
			})
		}
	})
}
