import expectFields from '../middleware/expectFields'
import { Route } from './routes.d'
import { successResponse, errorResponse } from '../responses/responses'
import { updateUser } from '../services/datastore'

const updateUserInfoFields = ['userID', 'username', 'description']

const updateUserInfo: Route = (app) => {
  app.post('/updateUserInfo', expectFields(updateUserInfoFields), async (req, res) => {
    const { userID } = req.body
    try {
      console.log("HEREEE")
      await updateUser(userID, { ...req.body })
      return successResponse(res)
    } catch (e) {
      return errorResponse(res, 500, `Failed to update user with id "${userID}"`, e)
    }
  })
}

export default updateUserInfo
