import uploadImage from '../util/uploadImage'
import expectFields from '../middleware/expectFields'
import { Route } from './routes.d'
import { successResponse, errorResponse } from '../responses/responses'
import { updateUser } from '../services/datastore'

const updateUserImage: Route = (app) => {
  app.post('/updateUserImage', expectFields(['userID']), async (req, res) => {
    const userID = req.body.userID as string
    const icon = (req.files as Express.Multer.File[])[0]

    let iconURL
    try {
      iconURL = await uploadImage(icon)
    } catch (e) {
      return errorResponse(res, 500, `Failed to upload image`, e)
    }

    try {
      await updateUser(userID, { icon: iconURL })
      return successResponse(res)
    } catch (e) {
      return errorResponse(res, 500, `Failed to update user with id "${userID}"`, e)
    }
  })
}

export default updateUserImage
