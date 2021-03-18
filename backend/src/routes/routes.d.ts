import { Application } from 'express'

export type Route = (app: Application) => void
