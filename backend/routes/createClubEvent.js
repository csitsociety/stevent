module.exports = function(app, datastore) {
    app.post('/createClubEvent', async (req, res) => {
				const { title, date, hostingClubs, description, status } = req.body;
        if (title.length == 0 || date.length == 0 || hostingClubs.length == 0 || description.length == 0) {
            res.json({
                success: false,
                errors: {
									main: "Invalid event details"
								}
            })
            return
        }

        try {
            const key = (await datastore.allocateIds(datastore.key('Event'), 1))[0][0];
						console.log(key);
            const entity = {
                key,
                data: {
                    name: title,
                    date,
                    hostingClubs,
                    description,
                    attendees: [],
                    status
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
