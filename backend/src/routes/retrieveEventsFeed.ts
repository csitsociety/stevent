import { Route } from './routes.d'
import { successResponse, errorResponse } from '../responses/responses'
import { getEvents } from '../services/datastore'
import { Event } from '../api.d'

const retrieveEventsFeed: Route = (app) => {
  app.get('/retrieveEventsFeed', async (req, res) => {
    let events: Event[]
    try {
      events = await getEvents()
    } catch (e) {
      return errorResponse(res, 500, `Failed to retrieve events feed`, e)
    }

    const filter = req.query.filter as string
    const matchingEvents =
      !filter || filter === ''
        ? events
        : events.filter(({ name, hostingClubs }) =>
            (name + hostingClubs.join('')).toLowerCase().includes(filter.toLowerCase())
          )
    matchingEvents.sort((a, b) => b.date - a.date)
    successResponse(res, { events: matchingEvents })
  })
}

export default retrieveEventsFeed
