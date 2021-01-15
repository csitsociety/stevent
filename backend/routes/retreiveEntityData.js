module.exports = function(app, datastore) {
    app.post('/retrieveEntityData', async (req, res) => {
        const entityID = req.body.entityID
        const entityType = req.body.entityType
        const query = datastore.createQuery(entityType).filter("__key__", "=", datastore.key([entityType, entityID]))
        const entity = (await datastore.runQuery(query))[0][0]
        if (entity) {
            res.json({
                success: true,
                entity
            })
        } else {
            res.json({
                success: false,
            })
        }
    })
}