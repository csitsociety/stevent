module.exports = function(app, datastore) {
    app.post('/signup', async (req, res) => {
        const uid = req.body.uid
        const username = req.body.username
        const email = req.body.email
        const rmitID = req.body.rmitID
        try {
            const entity = {
                key: datastore.key(['User', uid]),
                data: {
                    username,
                    rmitID,
                    email,
                    description: "",
                    icon: "default-user-icon.png",
                    adminClubs: [],
                    memberClubs: [],
                    attendedEvents: [],
                    attendingEvents: []
                }
            }
            datastore.upsert(entity)
            res.json({
                success: true,
            })
        } catch (e)  {
            console.log(e)
            res.json({
                success: false,
            })
        }
    })
}
