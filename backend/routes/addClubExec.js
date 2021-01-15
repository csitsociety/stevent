module.exports = function(app, datastore) {
    app.post('/addClubExec', async (req, res) => {
        const clubID = req.body.clubID
        const newExecID = req.body.newExecID
        const query = datastore.createQuery("User").filter("__key__","=",datastore.key(['User', newExecID]))
        const newExecAccount = datastore.runQuery(query)
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
