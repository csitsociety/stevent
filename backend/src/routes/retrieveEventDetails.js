module.exports = function(app, datastore, translate) {
    app.get('/retrieveEventDetails', async (req, res) => {
    const { eventID } = req.query;
    const query = datastore.createQuery("Event").filter("__key__", "=", datastore.key(["Event", parseInt(eventID)]))
    const event = (await datastore.runQuery(query))[0][0]
    res.json({
      event
    })
  })
}
