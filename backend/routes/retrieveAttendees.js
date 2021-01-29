module.exports = function(app, datastore, translate) {
    app.get('/retrieveAttendees', async (req, res) => {
    const auth = req.currentUser;
      if (auth) {
        const { eventID } = req.query;
        const query = datastore.createQuery("User")
        const users = (await datastore.runQuery(query))[0]
        let attendingUsers = []
        for (i = 0; i < users.length; i++) {
            if (users[i].events && users[i].events.includes(eventID)) {
                attendingUsers.push({...users[i], id: users[i][datastore.KEY].name})
            }
        }
        res.json({
          attendingUsers
        })
      } else {
        return res.status(403).send('Not authorized');
      }
    })
  }
