module.exports = function(app, datastore, translate) {
    app.get('/retrieveEventDetails', async (req, res) => {
    const { eventID, lang} = req.query;
    const query = datastore.createQuery("Event").filter("__key__", "=", datastore.key(["Event", parseInt(eventID)]))
    const event = (await datastore.runQuery(query))[0][0]
    if (lang != "au") {
      event.description = (await translate.translate(event.description, lang))[0]
    }
    res.json({
      event
    })
  })
}
