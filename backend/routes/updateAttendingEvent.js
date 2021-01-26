module.exports = function(app, datastore) {
    app.post('/updateAttendingEvent', async (req, res) => {
        const { eventID, rmitID, state } = req.body
        console.log(eventID)
        console.log(rmitID)
        console.log(state)
        const eventQuery = datastore.createQuery("Event").filter("__key__", "=", datastore.key(["Event", parseInt(eventID)]))
        const event = (await datastore.runQuery(eventQuery))[0][0]
        console.log(event)
        const userQuery = datastore.createQuery("User").filter("rmitID", "=", rmitID)
        const user = (await datastore.runQuery(userQuery))[0][0]
        console.log(user)
        if (state == 0) {
            var userIndex = event.attending.indexOf(rmitID)
            if (userIndex !== -1) {
                event.attending.splice(userIndex, 1)
            }
            var eventIndex = user.events.indexOf(eventID)
            if (eventIndex !== -1) {
                user.events.splice(eventIndex, 1)
            }
        } else {
            event.attending.push(rmitID)
            user.events.push(eventID)
        }
        datastore.upsert(event)
        datastore.upsert(user)
    })
}