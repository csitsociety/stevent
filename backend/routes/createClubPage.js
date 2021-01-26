module.exports = function(app, datastore) {
    app.post('/createClubPage', async (req, res) => {
        const { name, clubID, description, discord, icon, joinLink } = req.body;
        if (name.length == 0
					|| description.length == 0
					|| joinLink.length == 0
					|| clubID.length == 0
					|| name.length == 0
					|| discord.length == 0
					|| icon.length == 0
				) {
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
											clubID: "Club ID already exists"
										}
                })
            } else {
                try {
                    const entity = {
                        key: datastore.key(['Club', clubID]),
                        data: {
                            name,
														description,
														discord,
														icon,
														joinLink,
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
