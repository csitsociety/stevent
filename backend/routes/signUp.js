const bcrypt = require('bcrypt')
module.exports = function(app, datastore) {
    app.post('/signup', async (req, res) => {
        const uid = req.body.uid
        let username = req.body.username
        const email = req.body.email
        const password = req.body.password
        username = username.toLowerCase()
        const query = datastore.createQuery('User').filter('__key__', '=', datastore.key(['User', uid]))
        const user = (await datastore.runQuery(query))[0][0]
        if (!user) {
            try {
                bcrypt.hash(password, 10, function(err, hash) {
                    const entity = {
                        key: datastore.key(['User', uid]),
                        data: {
                            username,
							email,
                            password: hash,
                            adminClubs: [],
                            memberClubs: []
                        }
                    }
                    datastore.upsert(entity)
                })
                res.json({
                    success: true,
                })
            } catch (e)  {
                console.log(e)
                res.json({
                    success: false,
                })
            }
        } else {
            res.json({
                success: false,
                errors: {
                    username: "Number is already registered"
                }
            })
        }
    })
}
