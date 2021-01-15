module.exports = function(app, datastore) {
    app.post('/queryUser', async (req, res) => {
        let username = req.body.username
        const query = datastore.get(datastore.key(['User', username]))
        const user = (await datastore.runQuery(query))[0][0]
        if (user) {
            res.json({
                success: true,
                user
            })
        } else {
            res.json({
                success: false
            })
        }
    })
}

