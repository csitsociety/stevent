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
            const entity = {
                key: datastore.key('Event'),
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
                success: true
            })
        } catch (e) {
            res.json({
                success: false
            })
        }
    })
}
