import { Request, Response } from 'express'

export type Response = (req: Request, res: Response) => unknown
