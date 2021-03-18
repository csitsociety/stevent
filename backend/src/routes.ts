import { Application } from 'express'

import signUp from './routes/signUp'
import createClubPage from './routes/createClubPage'
import createClubEvent from './routes/createClubEvent'
import deleteClubPage from './routes/deleteClubPage'
import deleteClubEvent from './routes/deleteClubEvent'
import retrieveDSUser from './routes/retrieveDSUser'
import retrieveEventsFeed from './routes/retrieveEventsFeed'
import retrieveEventDetails from './routes/retrieveEventDetails'
import retrieveClubs from './routes/retrieveClubs'
import retrieveClubDetails from './routes/retrieveClubDetails'
import retrieveAttendees from './routes/retrieveAttendees'
import updateSubscriptionToClub from './routes/updateSubscriptionToClub'
import updateAttendingEvent from './routes/updateAttendingEvent'
import updateUserInfo from './routes/updateUserInfo'
import updateUserImage from './routes/updateUserImage'

export const addRoutes = (app: Application): void => {
  signUp(app)
  createClubPage(app)
  createClubEvent(app)
  deleteClubPage(app)
  deleteClubEvent(app)
  retrieveDSUser(app)
  retrieveClubs(app)
  retrieveClubDetails(app)
  retrieveEventsFeed(app)
  retrieveEventDetails(app)
  retrieveAttendees(app)
  updateSubscriptionToClub(app)
  updateAttendingEvent(app)
  updateUserInfo(app)
  updateUserImage(app)
}
