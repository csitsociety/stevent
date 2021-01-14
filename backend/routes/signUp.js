const bcrypt = require('bcrypt')
module.exports = function(app, datastore) {
    app.post('/signup', async (req, res) => {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        if (username.length == 0 || password.length == 0 || email.length == 0) {
            res.json({
                success: false,
                errors: {
									main: "Make sure all the fields are filled"
								}
            })
            return
        }
        username = username.toLowerCase()
        const query = datastore.createQuery('User').filter('__key__', '=', datastore.key(['User', username]))
        const user = (await datastore.runQuery(query))[0][0]
        if (!user) {
            try {
                bcrypt.hash(password, 10, function(err, hash) {
                    const entity = {
                        key: datastore.key(['User', username]),
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
        }
    })
}
