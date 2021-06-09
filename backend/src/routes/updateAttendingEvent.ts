import expectFields from '../middleware/expectFields'
import { Route } from './routes.d'
import { errorResponse, successResponse } from '../responses/responses'
import { updateUserAttendingEvent, getUser, getEvent } from '../services/datastore'

const updateAttendingFields = ['eventID', 'userID', 'state']

const updateAttendingEvent: Route = (app) => {
  app.post('/updateAttendingEvent', expectFields(updateAttendingFields), async (req, res) => {
    const { eventID, userID, state } = req.body
    // Check that event exists
    const event = await getEvent(eventID)
    if (!event) {
      return errorResponse(res, 404, `No such event with id ${eventID}`)
    }

    const user = await getUser(userID)
    if (!user) {
      return errorResponse(res, 404, `No such user with id ${userID}`)
    }

    try {
      await updateUserAttendingEvent(userID, eventID, state)
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
