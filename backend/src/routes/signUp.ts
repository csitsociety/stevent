import expectFields from '../middleware/expectFields'
import { errorResponse, successResponse } from '../responses/responses'
import { Route } from './routes.d'
import { signupUser } from '../services/datastore'

const signUpFields = ['uid', 'username', 'email', 'rmitID']

const signUp: Route = (app) => {
  app.post('/signup', expectFields(signUpFields), async (req, res) => {
    const { uid, username, email, rmitID } = req.body
    try {
      await signupUser(uid, {
        username,
        email,
        rmitID,
      })
      successResponse(res)
    } catch (e) {
      errorResponse(res, 500, `Failed to signup new user w/ id ${uid}`)
    }
  })
}

export default signUp
