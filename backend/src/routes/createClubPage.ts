import uploadImage from '../util/uploadImage'
import expectFields from '../middleware/expectFields'
import { Route } from './routes.d'
import { getClub, createClub } from '../services/datastore'
import { errorResponse, successResponse } from '../responses/responses'

const createClubPageFields = ['name', 'clubID', 'description', 'discord', 'joinLink']

const createClubPage: Route = async (app) => {
  app.post('/createClubPage', expectFields(createClubPageFields), async (req, res) => {
    const clubID = req.body.clubID

    // Ensure we got the icon
    const icon = (req.files as Express.Multer.File[])[0]
    if (!icon) {
      return errorResponse(res, 400, 'Expected icon file')
    }

    // Check if a club with this ID exists already
    const existingClub = await getClub(clubID)
    if (existingClub) {
      return errorResponse(res, 400, `Club with ID "${clubID}" already exists`)
    }

    // Upload the icon
    let iconURL: string
    try {
      iconURL = await uploadImage(icon)
    } catch (e) {
      return errorResponse(res, 500, `Failed to upload icon`, e)
    }

    // Add new club
    try {
      const club = await createClub(clubID, {
        icon: iconURL,
        ...req.body,
      })
      successResponse(res, { club })
    } catch (e) {
      return errorResponse(res, 500, `Failed to create club with id "${clubID}"`)
    }
  })
}

export default createClubPage
