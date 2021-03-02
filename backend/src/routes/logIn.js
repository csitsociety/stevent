const expectFields = require('../middleware/expectFields.js')
const bcrypt = require('bcrypt')

module.exports = function(app, datastore) {
    app.post('/login', expectFields(['username', 'password']), async (req,res) => {
        const username = req.body.username.toLowerCase()
        const password = req.body.password
        const query = datastore
            .createQuery('User')
            .filter('__key__', '=', datastore.key(['User', username]))
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
                        errors: {
													password: 'Incorrect password'
												}
                    })
                    return
                }
            })
        } else {
            res.json({
                success: false,
                errors: {
									username: 'Couldn\'t find any users with that ID'
								}
            })
        }
    })
}
