module.exports = function(app, datastore) {
    app.get('/retrieveClubDetails', async (req, res) => {
    const auth = req.currentUser;
      if (auth) {
        const { clubID } = req.query;
        const query = datastore.createQuery("Club").filter("__key__", "=", datastore.key(["Club", clubID]))
        const club = (await datastore.runQuery(query))[0][0]
        console.log(club)
        res.json({
            club
        })
      } else {
        return res.status(403).send('Not authorized');
      }
    })
  }
