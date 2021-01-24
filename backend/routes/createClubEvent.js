module.exports = function(app, datastore) {
    app.post('/createClubPage', async (req, res) => {
        const title = req.body.title.trim()
        const date = req.body.date
        const hostingClubs = req.body.hostingClubs
        const description = req.body.description.trim()
        const status = req.body.description.trim()
        //const location
        if (title.length == 0 || date.length == 0 || size(hostingClubs) == 0 || description.length == 0) {
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
                key: datastore.key(['Event', title]),
                data: {
                    title,
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
