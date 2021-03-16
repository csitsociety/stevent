const expectFields = require('../middleware/expectFields.js')

const updateUserInfoFields = ['userID', 'username', 'description']

module.exports = function(app, datastore) {
	app.post('/updateUserInfo', expectFields(updateUserInfoFields), async (req, res) => {
		const { userID, username, description } = req.body;
		try {
			const userQuery = datastore.createQuery("User").filter("__key__", "=", datastore.key(["User", userID]));
			const user = (await datastore.runQuery(userQuery))[0][0];
			user.username = username;
			user.description = description;
			datastore.upsert(user);
			res.json({
				success: true,
			});
		} catch (e) {
			console.error(e);
			res.json({
				success: false,
			});
		}
	})
}
