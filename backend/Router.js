const signUp = require('./routes/signUp.js')
const logIn = require('./routes/logIn.js')
const logOut = require('./routes/logOut.js')
const isLoggedIn = require('./routes/isLoggedIn.js')
const createClubPage = require('./routes/createClubPage.js')
const createClubEvent = require('./routes/createClubEvent.js')
const deleteClubPage = require('./routes/deleteClubPage.js')
const deleteClubEvent = require('./routes/deleteClubEvent.js')
const retrieveDSUser = require('./routes/retrieveDSUser')
const uploadImage = require('./routes/uploadImage.js')
const retrieveEventsFeed = require('./routes/retrieveEventsFeed.js')
const retrieveEventDetails = require('./routes/retrieveEventDetails.js')
const retrieveClubs = require('./routes/retrieveClubs.js')
const retrieveClubDetails = require('./routes/retrieveClubDetails.js')
const retrieveAttendees = require('./routes/retrieveAttendees.js')
const updateSubscriptionToClub = require('./routes/updateSubscriptionToClub.js')

class Router {

    constructor(app, datastore, translate) {
        deleteClubEvent(app, datastore)
        signUp(app, datastore)
        logIn(app, datastore)
        logOut(app, datastore)
        isLoggedIn(app, datastore)
        createClubPage(app, datastore)
        createClubEvent(app, datastore)
        deleteClubPage(app, datastore)
        deleteClubEvent(app, datastore)
        retrieveDSUser(app, datastore)
        uploadImage(app, datastore)
        retrieveClubs(app, datastore)
				retrieveClubDetails(app, datastore)
        retrieveEventsFeed(app, datastore, translate)
        retrieveEventDetails(app, datastore, translate)
        retrieveAttendees(app, datastore)
        updateSubscriptionToClub(app, datastore)
    }

}
module.exports = Router
