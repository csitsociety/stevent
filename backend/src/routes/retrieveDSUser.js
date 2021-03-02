module.exports = function(app, datastore) {
  app.get('/retrieveDSUser', async (req, res) => {
  const uid = req.query.uid;
    if (uid) {
      const query = datastore.createQuery("User").filter("__key__", "=", datastore.key(["User", uid]))
      const user = (await datastore.runQuery(query))[0][0]
      res.json({
        user: {
					...user,
					id: uid,
				}
      })
    } else {
      return res.status(403).send('Not authorized');
    }
  })
}
