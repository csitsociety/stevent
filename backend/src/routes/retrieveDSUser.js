module.exports = function(app, datastore) {
  app.get('/retrieveDSUser', async (req, res) => {
  const uid = req.query.uid;
    if (uid) {
      const query = datastore
        .createQuery("User")
        .filter("__key__", "=", datastore.key(["User", uid]))
      const user = (await datastore.runQuery(query))[0][0]
      if (!user) {
        return res.status(400)
          .json({
              success: false,
              error: `No such user with id ${uid}`
          })
      }

      return res.json({
          user,
          uid
      })

    } else {
      return res.status(403).send('Not authorized');
    }
  })
}
