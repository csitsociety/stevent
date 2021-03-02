module.exports = function(app, datastore) {
    app.post('/logout', (req, res) => {
        if (req.session.userID) {
            req.session.destroy()
            res.json({
                success: true
            })
            return true
        } else {
            res.json({
                success: false
            })
            return false
        }
    })
}