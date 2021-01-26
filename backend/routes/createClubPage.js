module.exports = function(app, datastore) {
    app.post('/createClubPage', async (req, res) => {
        const clubName = req.body.clubName.trim()
        const clubID = req.body.clubID.trim()
        const clubDescription = req.body.clubDescription.trim()
        const clubSignupLink = req.body.clubSignupLink.trim()
        if (clubName.length == 0 || clubDescription.length == 0 || clubSignupLink.length == 0 || clubID.length == 0) {
            res.json({
                success: false,
                errors: {
									main: "Invalid club details"
								}
            })
            return
        }
        const query = datastore.createQuery('Club').filter('__key__', '=', datastore.key(['Club', clubID]))
            const existingClub = (await datastore.runQuery(query))[0][0]
            if (existingClub) {
                res.json({
                    success: false,
                    errors: {
											clubId: "Club ID already exists"
										}
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
