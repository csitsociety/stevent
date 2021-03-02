const expectFields = require('../middleware/expectFields.js')

module.exports = function(app, datastore) {
    app.post('/addClubExec', expectFields(['clubID', 'newExecID']), async (req, res) => {
        const clubID = req.body.clubID
        const newExecID = req.body.newExecID
        const query = datastore.createQuery("User").filter("__key__","=",datastore.key(['User', newExecID]))
        const newExecAccount = (await datastore.runQuery(query))[0][0]
        if (newExecAccount) {
            let club = datastore.get(datastore.key("Club", clubID))
            if (club.execs.contains(newExecID)) {
                res.json({
                    success: false,
                    errors: {
                        "modifyExec": "That user is already an executive!"
                    }
                })
            } else {
                club.execs.push(newExecID)
                datastore.put(club)
                res.json({
                    success: true,
                })
            }
        } else {
            res.json({
                success: false,
                errors: {
                    "modifyExec": "That account does not exist!"
                }
            })
        }
    })
}
