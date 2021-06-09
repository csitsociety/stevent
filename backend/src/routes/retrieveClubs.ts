import { successResponse, errorResponse } from '../responses/responses'
import { getClubs } from '../services/datastore'
import { Route } from './routes.d'

const retrieveClubs: Route = (app) => {
  app.get('/retrieveClubs', async (req, res) => {
    try {
      const clubs = await getClubs()
      successResponse(res, { clubs })
    } catch (e) {
      errorResponse(res, 500, `Failed to retrieve clubs`, e)
    }
  })
}

export default retrieveClubs
