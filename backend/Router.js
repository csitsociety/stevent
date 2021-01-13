const bcrypt = require('bcrypt')
//https://cloud.google.com/datastore/docs/concepts/queries
//https://cloud.google.com/datastore/docs/concepts/entities#datastore-datastore-basic-entity-nodejs
class Router {
    
    constructor(app, datastore) {
        this.login(app, datastore)
        this.logout(app, datastore)
        this.isLoggedIn(app, datastore)
        this.signup(app, datastore)
        this.createClubPage(app, datastore)
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
                    res.json({
                        success: false,
                    })
                }
            }
        })
    }

    createClubPage(app, datastore) {
        app.post('/createClubPage', async (req, res) => {
            console.log("tesat")
            const clubName = req.body.clubName.trim()
            const clubID = req.body.clubID.trim()
            const clubDescription = req.body.clubDescription.trim()
            const clubSignupLink = req.body.clubSignupLink.trim()
            if (clubName.length == 0 || clubDescription.length == 0 || clubSignupLink.length == 0 || clubID.length == 0) {
                res.json({
                    success: false,
                    msg: "Invalid club details!"
                })
                return
            }

            const query = datastore.createQuery('Club').filter('__key__', '=', datastore.key(['Club', clubID]))
            const existingClub = (await datastore.runQuery(query))[0][0]
            if (existingClub) {
                res.json({
                    success: false,
                    message: "Club ID already exists"
                })
            } else {
                try {
                    const entity = {
                        key: datastore.key(['Club', clubID]),
                        data: {
                            clubName,
                            clubDescription,
                            clubSignupLink
                        }
                    }
                    datastore.upsert(entity)
                    res.json({
                        success: true
                    })
                } catch (e) {
                    res.json({
                        success: false
                    })
                }
            }
        })
    }

    deleteClubPage() {
        app.post('/createClubPage', async (req, res) => {
            const clubID = req.body.clubID
            try {
                datastore.delete(datastore.key(['Club', clubID]))
                res.json({
                    success: true
                })
            } catch (e) {
                res.json({
                    success: false
                })
            }
        })
    }

    createClubEvent(app, datastore) {
        app.post('/createClubPage', async (req, res) => {
            const title = req.body.title.trim()
            const date = req.body.date.trim()
            const time = req.body.time.trim()
            const hostingClubs = req.body.hostingClubs
            const description = req.body.description.trim()
            //const location
            if (title.length == 0 || date.length == 0 || time.length == 0 || size(hostingClubs) == 0 || description.length == 0) {
                res.json({
                    success: false,
                    msg: "Invalid club details!"
                })
                return
            }

            try {
                const entity = {
                    key: datastore.key(['Event', title]),
                    data: {
                        title,
                        date,
                        time,
                        hostingClubs,
                        description,
                        attendees: []
                    }
                }
                datastore.upsert(entity)
                res.json({
                    success: true
                })
            } catch (e) {
                res.json({
                    success: false
                })
            }
        })
    }

    deleteClubEvent(app, datastore) {
        app.post('/createClubPage', async (req, res) => {
            const title = req.body.title
            try {
                datastore.delete(datastore.key(['Event', title]))
                res.json({
                    success: true
                })
            } catch (e) {
                res.json({
                    success: false
                })
            }
        })
    }
}

module.exports = Router