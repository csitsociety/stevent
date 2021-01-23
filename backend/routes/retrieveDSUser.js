module.exports = function(app, datastore) {
  app.get('/retrieveDSUser', async (req, res) => {
  console.log(req)
  const uid = req.query.uid;
  console.log(uid, "auth")
    if (uid) {
      const query = datastore.createQuery("User").filter("__key__", "=", datastore.key(["User", uid]))
      const user = (await datastore.runQuery(query))[0][0]
      res.json({
        user
      })
    } else {
      return res.status(403).send('Not authorized');
    }
  })
}