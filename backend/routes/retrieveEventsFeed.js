module.exports = function(app, datastore) {
    app.get('/retrieveEventsFeed', async (req, res) => {
        const filter = req.query.filter
        const query = datastore.createQuery('Event')
        let events = (await datastore.runQuery(query))[0]
        events = events.map(event => ({ ...event, id: event[datastore.KEY].id }));
        let matchingEvents = []
        if (filter != "") {
            for (i = 0; i < events.length; i++) {
                if (events[i].name.toLowerCase().includes(filter.toLowerCase())) {
                    matchingEvents.push(events[i])
                } else {
                    for (let j = 0; j < events[i].hostingClubs; j++) {
                        if (events[i].hostingClubs[j].toLowerCase().includes(filter.toLowerCase())) {
                            matchingEvents.push(events[i])
                        }
                    }
                }
            }
            res.json({
                matchingEvents
            })
        } else {
            res.json({
                matchingEvents: events
            })
        }
    })
}
