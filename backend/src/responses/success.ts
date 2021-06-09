import { Response } from 'express'
import { Event, Club, User, UserID } from '../api.d'

interface EventResponse {
  event: Event
}

interface EventsResponse {
  events: Event[]
}

interface ClubResponse {
  club: Club
}

interface ClubsResponse {
  clubs: Club[]
}

interface UserResponse {
  uid?: UserID
  user: User
}

interface AttendeesResponse {
  attendingUsers: User[]
}

interface SubscribedResponse {
  subscribed: boolean
}

interface AttendingResponse {
  state: boolean
}

type Data =
  | ClubsResponse
  | EventsResponse
  | EventResponse
  | ClubResponse
  | AttendeesResponse
  | UserResponse
  | SubscribedResponse
  | AttendingResponse
  | Record<string, never>

export const successResponse = (res: Response, data: Data = {}): void => {
  res.json({
    success: true,
    ...data,
  })
}
