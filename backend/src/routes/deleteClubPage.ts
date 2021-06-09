import expectFields from '../middleware/expectFields'
import { Route } from './routes.d'
import { deleteClub } from '../services/datastore'
import { successResponse, errorResponse } from '../responses/responses'

const deleteClubPage: Route = (app) => {
  app.post('/deleteClubPage', expectFields(['clubID']), async (req, res) => {
    const clubID = req.body.clubID
    try {
      await deleteClub(clubID)
      return successResponse(res)
    } catch (e) {
      return errorResponse(res, 500, `Failed to delete club with id "${clubID}"`)
    }
  })
}

export default deleteClubPage
