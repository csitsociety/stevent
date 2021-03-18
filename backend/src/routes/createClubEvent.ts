import uploadImage from '../util/uploadImage'
import expectFields from '../middleware/expectFields'
import { errorResponse, successResponse } from '../responses/responses'
import { Route } from './routes.d'
import { createEvent } from '../services/datastore'

const createClubEventFields = ['name', 'date', 'hostingClubs', 'description', 'location']

const createClubEvent: Route = (app) => {
  app.post('/createClubEvent', expectFields(createClubEventFields), async (req, res) => {
    const { name, date, hostingClubs, description, location } = req.body
    const image = (req.files as Express.Multer.File[])[0]

    if (!image) {
      return errorResponse(res, 400, `Expected image file`)
    }

    let imageURL: string
    try {
      imageURL = await uploadImage(image)
    } catch (e) {
      return errorResponse(res, 500, `There was a problem uploading the event image`, e)
    }

    let dateObj: number
    try {
      dateObj = parseInt(date)
    } catch (e) {
      return errorResponse(res, 500, `Failed to parse event date "${date}"`, e)
    }

    let hostingClubsObj: string[]
    try {
      hostingClubsObj = JSON.parse(hostingClubs)
    } catch (e) {
      return errorResponse(res, 500, `Failed to parse hosting clubs "${hostingClubs}"`, e)
    }

    try {
      const event = await createEvent({
        name,
        image: imageURL,
        date: dateObj,
        hostingClubs: hostingClubsObj,
        description,
        location,
      })
      return successResponse(res, { event })
    } catch (e) {
      return errorResponse(res, 500, `Failed to create event`, e)
    }
  })
}

export default createClubEvent
