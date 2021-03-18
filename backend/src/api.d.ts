export type EventID = string
export type ClubID = string
export type UserID = string
export type TimeStamp = number
export type ImagePath = string

export interface User {
  username: string
  email: string
  icon: ImagePath
  rmitID: string
  superadmin: boolean
  description: string
  subscribed: ClubID[] // I THINK
  events: ClubID[] // I THINK
  adminClubs: ClubID[] // I THINK
}

export interface Event {
  id: EventID
  name: string
  location: string
  hostingClubs: ClubID[]
  description: string
  date: TimeStamp
  image: ImagePath
}

export interface Club {
  id: ClubID
  name: string
  description: string
  discord: string
  icon: ImagePath
  joinLink: string
}
