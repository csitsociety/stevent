const bcrypt = require('bcrypt')
module.exports = function(app, datastore) {
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