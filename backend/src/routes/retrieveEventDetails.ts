import expectFields from '../middleware/expectFields'
import { successResponse, errorResponse } from '../responses/responses'
import { Route } from './routes.d'
import { getEvent } from '../services/datastore'

const retrieveEventDetails: Route = (app) => {
  app.get('/retrieveEventDetails', expectFields(['eventID'], 'query'), async (req, res) => {
    const eventID = req.query.eventID as string
    try {
      const event = await getEvent(eventID)
      successResponse(res, { event })
    } catch (e) {
      errorResponse(res, 500, `Failed to retrieve event with id "${eventID}"`, e)
    }
  })
}

export default retrieveEventDetails
