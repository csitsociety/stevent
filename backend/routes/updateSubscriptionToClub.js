module.exports = function(app, datastore) {
	app.post('/updateSubscriptionToClub', async (req, res) => {
		const { clubID, userID, subscribe } = req.body;
		console.log(req.body);
		try {
			const userQuery = datastore.createQuery("User").filter("__key__", "=", datastore.key(["User", userID]));
			const user = (await datastore.runQuery(userQuery))[0][0];
			if (!subscribe) {
				const clubIndex = user.subscribed.indexOf(clubID);
				if (clubIndex !== -1) {
					user.subscribed.splice(clubIndex, 1);
				}
			} else {
				user.subscribed.push(clubID);
			}
			datastore.upsert(user);
			res.json({
				success: true,
				subscribed: subscribe,
			});
		} catch (e) {
			console.error(e);
			res.json({
				success: false,
			});
		}
	})
}
