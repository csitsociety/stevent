module.exports = function(app, datastore) {
    app.post('/updateSubscriptionToClub', async (req, res) => {
        const { clubID, rmitID, state } = req.body
        const clubQuery = datastore.createQuery("Club").filter("clubID", "=", clubID)
        const club = (await datastore.runQuery(clubQuery))[0][0]
        const userQuery = datastore.createQuery("User").filter("rmitID", "=", rmitID)
        const user = (await datastore.runQuery(userQuery))[0][0]
        if (state == true) {
            var userIndex = club.subscribed.indexOf(rmitID)
            if (userIndex !== -1) {
                club.subscribed.splice(userIndex, 1)
            }
            var clubIndex = user.subscribed.indexOf(clubID)
            if (clubIndex !== -1) {
                user.subscribed.splice(clubIndex, 1)
            }
        } else {
            club.subscribed.push(rmitID)
            user.subscribed.push(clubID)
        }
        datastore.upsert(club)
        datastore.upsert(user)
    })
} 