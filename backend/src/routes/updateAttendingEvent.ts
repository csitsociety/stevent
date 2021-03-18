import expectFields from '../middleware/expectFields'
import { Route } from './routes.d'
import { errorResponse, successResponse } from '../responses/responses'
import { updateUserAttendingEvent } from '../services/datastore'

const updateAttendingFields = ['eventID', 'userID', 'state']

const updateAttendingEvent: Route = (app) => {
  app.post('/updateAttendingEvent', expectFields(updateAttendingFields), async (req, res) => {
    const { eventID, userID, state } = req.body
    try {
      await updateUserAttendingEvent(eventID, userID, state)
      successResponse(res, { state })
    } catch (e) {
      errorResponse(
        res,
        500,
        `Failed to update attending for user "${userID}" for event ${eventID}`,
        e
      )
    }
  })
}

export default updateAttendingEvent
