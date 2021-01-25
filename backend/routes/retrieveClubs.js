module.exports = function(app, datastore) {
    app.get('/retrieveClubs', async (req, res) => {
        const query = datastore.createQuery('Club')
        let clubs = (await datastore.runQuery(query))[0]
        clubs = clubs.map(club => ({ ...club, id: club[datastore.KEY].id }));
        res.json({
            clubs
        })
    })
}
