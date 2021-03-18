import { getUser } from '../services/datastore'
import expectFields from '../middleware/expectFields'
import { successResponse, errorResponse } from '../responses/responses'
import { Route } from './routes.d'

const retrieveUser: Route = (app) => {
  app.get('/retrieveDSUser', expectFields(['uid'], 'query'), async (req, res) => {
    try {
      const uid = String(req.query)
      const user = await getUser(uid)
      if (!user) {
        return errorResponse(res, 404, `No such user with uid ${uid}`)
      }
      return successResponse(res, { uid, user })
    } catch (e) {
      return errorResponse(res, 500, `Something went wrong when retrieving user`)
    }
  })
}

export default retrieveUser
