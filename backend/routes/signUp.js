module.exports = function(app, datastore) {
    app.post('/signup', async (req, res) => {
        const { uid, username, email, rmitID } = req.body;
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
                    attendingEvents: [],
										superadmin: false,
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
