module.exports = function(app, datastore) {
  app.get('/retrieveDSUser', async (req, res) => {
  console.log("test")
  const auth = req.currentUser;
  console.log(auth, "auth")
    if (auth) {
      const uid = req.currentUser.uid
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