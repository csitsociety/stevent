import { Request, Response, NextFunction } from 'express'

export type AugmentedRequest = Request & {
  currentUser?: Record<unknown, unknown>
  userID?: string
}
export type Middleware = (req: AugmentedRequest, res: Response, next: NextFunction) => unknown
