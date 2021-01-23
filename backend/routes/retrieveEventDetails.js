module.exports = function(app, datastore) {
    app.get('/retrieveEventDetails', async (req, res) => {
    const auth = req.currentUser;
      if (auth) {
        const eventID = req.body.eventID
        const query = datastore.createQuery("Event").filter("__key__", "=", datastore.key(["Event", eventID]))
        const event = (await datastore.runQuery(query))[0][0]
        res.json({
          event
        })
      } else {
        return res.status(403).send('Not authorized');
      }
    })
  }