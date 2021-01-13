module.exports = function(app, datastore) {
    app.post('/isLoggedIn', async (req, res) => {
        if (req.session.userID) {
            const query = datastore.createQuery('User').filter('__key__', '=', datastore.key(['User', username]))
            const user = (await datastore.runQuery(query))[0][0]
            if (user) {      
                res.json({
                    success: true,
                    username: user.username
                })
                return true
            } else {
                res.json({
                    success: false,
                })
            }
        } else {
            res.json({
                success: false,
            })
        }
    })
}