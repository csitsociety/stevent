import { Response } from 'express'

type ErrorResponseF = (res: Response, statusCode: number, message: string, error?: Error) => void

export const errorResponse: ErrorResponseF = (res, statusCode, message, error) => {
  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      error,
    },
  })
}
