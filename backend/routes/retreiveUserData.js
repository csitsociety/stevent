module.exports = function(app, datastore) {
    app.post('/retrieveUserData', async (req, res) => {
        const userID = req.body.userID
        const query = datastore.createQuery("User").filter("__key__", "=", datastore.key(['User', userID]))
        const user = (await datastore.runQuery(query))[0][0]
        if (user) {
            res.json({
                success: true,
                user
            })
        } else {
            res.json({
                success: false,
            })
        }
    })
}