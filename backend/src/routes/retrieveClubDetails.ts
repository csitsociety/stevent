import expectFields from '../middleware/expectFields'
import { successResponse, errorResponse } from '../responses/responses'
import { getClub } from '../services/datastore'
import { Route } from './routes.d'

const retrieveClubDetails: Route = (app) => {
  app.get('/retrieveClubDetails', expectFields(['clubID'], 'query'), async (req, res) => {
    const clubID = req.query.clubID as string
    try {
      const club = await getClub(clubID)
      if (!club) {
        return errorResponse(res, 404, `No such club with id ${clubID}`)
      }
      successResponse(res, { club })
    } catch (e) {
      errorResponse(res, 500, `Failed to retrieve club with id "${clubID}"`, e)
    }
  })
}

export default retrieveClubDetails
