const config = require('../config');
const expectFields = require('../middleware/expectFields.js')

module.exports = function(app, datastore) {
    app.post('/signup', expectFields(['uid', 'username', 'email', 'rmitID']), async (req, res) => {
        const { uid, username, email, rmitID } = req.body;
        try {
            const entity = {
                key: datastore.key(['User', uid]),
                data: {
                    username,
                    rmitID,
                    email,
                    description: "",
                    icon: `https://storage.cloud.google.com/${config.bucketName}/avatar.png`,
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
