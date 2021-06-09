import expectFields from '../middleware/expectFields'
import { successResponse, errorResponse } from '../responses/responses'
import { Route } from './routes.d'
import { getEvent, getEventAttendees } from '../services/datastore'

const retrieveAttendees: Route = (app) => {
  app.get('/retrieveAttendees', expectFields(['eventID'], 'query'), async (req, res) => {
    const eventID = req.query.eventID as string

    // Make sure that event exists
    const event = await getEvent(eventID)
    if (!event) {
      return errorResponse(res, 404, `No such event with id ${eventID}`)
    }

    // Get attendees
    try {
      const attendingUsers = await getEventAttendees(eventID)
      successResponse(res, { attendingUsers })
    } catch (e) {
      errorResponse(res, 500, `Failed to retrieve attendees of event with id "${eventID}"`, e)
    }
  })
}

export default retrieveAttendees
