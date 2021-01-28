const config = require('../config');

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
                    icon: `avatar.png`,
                    adminClubs: [],
                    subscribed: [],
                    events: [],
                    superadmin: false,
                    lang: 'en',
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
