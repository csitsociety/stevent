module.exports = function(app, datastore) {
    app.post('/queryEventsBy', async (req, res) => {
        const filter = req.body.filter
        const query = datastore.createQuery('Event')
        let events = (await datastore.runQuery(query))[0][0]
        let matchingEvents = []
        for (i = 0; i < events.length; i++) {
            for (var prop in events[i]) {
                if (Object.prototype.hasOwnProperty.call(events, prop)) {
                    if (events[i].prop.toLowerCase().includes(filter.toLowerCase())) {
                        matchingEvents.push(events[i])
                        break
                    }
                }
            }
        }
        res.json({
            events
        })
    })
}
