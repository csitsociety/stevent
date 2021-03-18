import expectFields from '../middleware/expectFields'
import { Route } from './routes.d'
import { errorResponse } from '../responses/responses'

const deleteClubEvent: Route = (app) => {
  app.post('/deleteClubEvent', expectFields(['title']), async (req, res) => {
    return errorResponse(res, 400, '/deleteClubEvent is disabled')
  })
}

export default deleteClubEvent
