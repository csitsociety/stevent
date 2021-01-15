module.exports = function(app, datastore) {
    app.post('/queryEventsBy', async (req, res) => {
        let body = JSON.parse(req.body)
        const query = datastore.createQuery('Event')
        for (i = 0; i < body.value.length; i++) {
            query = query.filter(body.value[i][0], body.value[i][1], body.value[i][2])
        }
        events = datastore.runQuery(query)
        res.json({
            events
        })
    })
}
