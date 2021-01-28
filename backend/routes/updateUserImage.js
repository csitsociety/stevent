const uploadImage = require('../uploadImage');

module.exports = function(app, datastore) {
	app.post('/updateUserImage', async (req, res) => {
		const { userID } = req.body;
		const icon = req.files[0];
		try {
			const userQuery = datastore.createQuery("User").filter("__key__", "=", datastore.key(["User", userID]));
			const user = (await datastore.runQuery(userQuery))[0][0];
			user.icon = await uploadImage(icon, userID);
			datastore.upsert(user);
			res.json({
				success: true,
				icon: user.icon,
			});
		} catch (e) {
			console.error(e);
			res.json({
				success: false,
			});
		}
	})
}
