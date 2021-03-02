const expectFields = require('../middleware/expectFields.js')

module.exports = function(app, datastore) {
	app.post('/updateAttendingEvent', expectFields(['eventID', 'userID', 'state']), async (req, res) => {
		const { eventID, userID, state } = req.body
		try {
			const userQuery = datastore.createQuery("User").filter("__key__", "=", datastore.key(["User", userID]))
			const user = (await datastore.runQuery(userQuery))[0][0]
			if (state == 0) {
				var eventIndex = user.events.indexOf(eventID);
				if (eventIndex !== -1) {
					user.events.splice(eventIndex, 1);
				}
			} else {
				user.events.push(eventID);
			}
			datastore.upsert(user);
			res.json({
				success: true,
				state,
			});
		} catch (e) {
			console.log(e);
			res.json({
				success: false,
			});
		}
	})
}
