module.exports = function(app, datastore) {
    app.post('/queryEventAttendees', async (req, res) => {
        let event = (await datastore.get(['Event', title]))[0][0]
        let attendees = []
        for (int = 0; i < event.attendees.size; i++) {
            const query = datastore.createQuery('User').filter(event.attendees[i])        
            const user = (await datastore.runQuery(query))[0][0]
            if (user) {
                attendees.push(user)
            }
        }
        res.json({
            attendees
        })
    })
}
