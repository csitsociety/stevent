const bcrypt = require('bcrypt')
module.exports = function(app, datastore) {
    app.post('/signup', async (req, res) => {
        let username = req.body.username
        const password = req.body.password
        if (username.length == 0 || password.length == 0) {
            res.json({
                success: false,
                msg: "Invalid username or password!"
            })
            return
        }
        console.log("ASDASD")
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