module.exports = function(app, datastore) {
    app.post('/removeClubExec', async (req, res) => {
        const clubID = req.body.clubID
        const oldExecID = req.body.oldExecID
        const query = datastore.createQuery("User").filter("__key__","=",datastore.key(['User', oldExecID]))
        const execAccount = (await datastore.runQuery(query))[0][0]
        if (execAccount) {
            let club = datastore.get(datastore.key("Club", clubID))
            if (club.execs.contains(oldExecID)) {
                for(var i = 0; i < club.execs.length; i++){ 
                    if (club.execs[i] === oldExecID) { 
                        arr.splice(i, 1); 
                        break;
                    }
                }
                datastore.put(club)
                res.json({
                    success: true
                })
            } else {
                res.json({
                    success: false,
                    errors: {
                        "modifyExec": "This account is not an executive"
                    }
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
