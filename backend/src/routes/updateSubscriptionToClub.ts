import expectFields from '../middleware/expectFields'
import { errorResponse, successResponse } from '../responses/responses'
import { updateClubSubscription } from '../services/datastore'
import { Route } from './routes.d'

const updateSubFields = ['clubID', 'userID', 'subscribe']

const updateSubscriptionToClub: Route = (app) => {
  app.post('/updateSubscriptionToClub', expectFields(updateSubFields), async (req, res) => {
    const { clubID, userID, subscribe } = req.body

    try {
      await updateClubSubscription(userID, clubID, subscribe)
      return successResponse(res, { subscribed: subscribe })
    } catch (e) {
      return errorResponse(res, 500, `Failed to retrieve user with id "${userID}"`, e)
    }
  })
}

export default updateSubscriptionToClub
