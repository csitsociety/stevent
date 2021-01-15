module.exports = function(app, datastore) {
    app.post('/queryEventsBy', async (req, res) => {
        let filters = req.body.filters
        const query = datastore.createQuery('Event')
        events = datastore.runQuery(query)
        for (var i in filters) {
            if (filters[i] != null) {
                for (j = 0; j < events.length; j++) {
                    if (i == "title") {
                        if (!(events[j].title.toLowerCase()).includes(filters["title"].toLowerCase())) {
                            events.remove(j)
                        }
                    } else if (i == "club") {
                        if (!(events[j].clubs.toLowerCase()).includes(filters["club"].toLowerCase())) {
                            events.remove(j)
                        }
                    }
                }
            }
        }
        res.json({
            events
        })
    })
}
