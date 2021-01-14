module.exports = function(app, datastore) {
    app.post('/createClubPage', async (req, res) => {
        const title = req.body.title.trim()
        const date = req.body.date.trim()
        const time = req.body.time.trim()
        const hostingClubs = req.body.hostingClubs
        const description = req.body.description.trim()
        //const location
        if (title.length == 0 || date.length == 0 || time.length == 0 || size(hostingClubs) == 0 || description.length == 0) {
            res.json({
                success: false,
                msg: "Invalid club details!"
            })
            return
        }

        try {
            const entity = {
                key: datastore.key(['Event', title]),
                data: {
                    title,
                    date,
                    time,
                    hostingClubs,
                    description,
                    attendees: []
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