import { Middleware } from './middleware.d'
import { errorResponse } from '../responses/error'

type FieldKey = 'body' | 'query'
type ExpectFieldsF = (fields: string[], key?: FieldKey) => Middleware
const expectFields: ExpectFieldsF = (fields, key = 'body') => async (req, res, next) => {
  // Check we have all the required fields
  for (const field of fields) {
    if (req[key][field] == undefined) {
      return errorResponse(res, 400, `Expected field ${field}`)
    }
  }

  // If we have all the fields
  next()
}

export default expectFields
