const expectFields = require('../middleware/expectFields.js')

module.exports = function(app, datastore) {
    app.post('/deleteClubPage', expectFields(['clubID']), async (req, res) => {
        const clubID = req.body.clubID
        try {
            datastore.delete(datastore.key(['Club', clubID]))
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
