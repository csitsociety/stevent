const bcrypt = require('bcrypt')
//https://cloud.google.com/datastore/docs/concepts/queries
//https://cloud.google.com/datastore/docs/concepts/entities#datastore-datastore-basic-entity-nodejs
class Router {
    
    constructor(app, datastore) {
        this.login(app, datastore)
        this.logout(app, datastore)
        this.isLoggedIn(app, datastore)
        this.signup(app, datastore)
    }

    login(app, datastore) {
        app.post('/login', async (req,res) => {
            let username = req.body.username
            const password = req.body.password
            if (username.length == 0 || password.length == 0) {
                res.json({
                    success: false,
                    msg: "An error has occured, please try again!"
                })
                return
            }
            username = username.toLowerCase()
            const query = datastore.createQuery('User').filter('__key__', '=', datastore.key(['User', username]))
            const user = (await datastore.runQuery(query))[0][0]
            if (user) {
                bcrypt.compare(password, user.password, (bcryptErr, verified) => {
                    if (verified) {
                        req.session.userID = username
                        res.json({
                            success: true,
                            username
                        })
                        return
                    } else {
                        res.json({
                            success: false,
                            msg: 'Incorrect password'
                        })
                        return
                    }
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Couldn\'t find any users with that ID'
                })
            }
        })
    }

    logout(app, datastore) {
        app.post('/logout', (req, res) => {
            if (req.session.userID) {
                req.session.destroy()
                res.json({
                    success: true
                })
                return true
            } else {
                res.json({
                    success: false
                })
                return false
            }
        })
    }

    isLoggedIn(app, datastore) {
        app.post('/isLoggedIn', async (req, res) => {
            if (req.session.userID) {
                const query = datastore.createQuery('User').filter('__key__', '=', datastore.key(['User', username]))
                const user = (await datastore.runQuery(query))[0][0]
                if (user) {      
                    res.json({
                        success: true,
                        username: user.username
                    })
                    return true
                } else {
                    res.json({
                        success: false,
                    })
                }
            } else {
                res.json({
                    success: false,
                })
            }
        })
    }

    signup(app, datastore) {
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
                                password: hash
                            }
                        }
                        datastore.upsert(entity)
                    })
                    res.json({
                        success: true,
                    })
                } catch (e)  {
                    res.json({
                        success: false,
                    })
                }
            }
        })
    }
}

module.exports = Router