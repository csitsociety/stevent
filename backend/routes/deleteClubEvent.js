module.exports = function(app, datastore) {
    app.post('/deleteClubEvent', async (req, res) => {
        const title = req.body.title
        try {
            datastore.delete(datastore.key(['Event', title]))
            res.json({
                success: true
            })
        } catch (e) {
            res.json({
                success: false
            })
        }
    })
}