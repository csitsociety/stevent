import { Datastore } from '@google-cloud/datastore'

import { User, UserID, Club, ClubID, Event, EventID } from '../api.d'
import config from '../config'

// Create a datastore
export const datastore = new Datastore({ projectId: config.projectId })

export const getUser = async (uid: UserID): Promise<User> => {
  const query = datastore.createQuery('User').filter('__key__', '=', datastore.key(['User', uid]))
  const user = (await datastore.runQuery(query))[0][0]
  return user
}

export const updateUser = async (userID: UserID, fields: Partial<User>): Promise<void> => {
  const user = getUser(userID)
  await datastore.upsert({
    ...user,
    ...fields,
  })
}

export const getUserByName = async (username: string): Promise<User> => {
  const query = datastore
    .createQuery('User')
    .filter('__key__', '=', datastore.key(['User', username]))
  const user = (await datastore.runQuery(query))[0][0]
  return user
}

export const signupUser = async (id: UserID, fields: Partial<User>): Promise<void> => {
  datastore.upsert({
    key: datastore.key(['User', id]),
    data: {
      ...fields,
      description: '',
      icon: `https://storage.cloud.google.com/${config.bucketName}/avatar.png`,
      adminClubs: [],
      subscribed: [],
      events: [],
      superadmin: false,
    },
  })
}

export const deleteUser = async (userID: UserID): Promise<void> => {
  await datastore.delete(datastore.key(['User', userID]))
}

export const getEvents = async (): Promise<Event[]> => {
  const query = datastore.createQuery('Event')
  const events = (await datastore.runQuery(query))[0]
  return events.map((event) => ({ ...event, id: event[datastore.KEY].id }))
}

export const getEventAttendees = async (eventID: EventID): Promise<User[]> => {
  const query = datastore.createQuery('User').filter('events', '=', eventID)
  const users = (await datastore.runQuery(query))[0]
  return users.map((user) => ({ ...user, id: user[datastore.KEY].id }))
}

export const getClub = async (clubID: ClubID): Promise<Club> => {
  const query = datastore
    .createQuery('Club')
    .filter('__key__', '=', datastore.key(['Club', clubID]))
  const club = (await datastore.runQuery(query))[0][0]
  return club && { ...club, id: clubID }
}

export const getClubs = async (): Promise<Club[]> => {
  const query = datastore.createQuery('Club')
  const clubs = (await datastore.runQuery(query))[0]
  return clubs.map((club) => ({ ...club, id: club[datastore.KEY].id }))
}

export const createClub = async (clubID: ClubID, fields: Partial<Club>): Promise<Club> => {
  const entity = {
    key: datastore.key(['Club', clubID]),
    data: {
      ...fields,
    },
  }
  await datastore.upsert(entity)
  return await getClub(clubID)
}

export const deleteClub = async (clubID: ClubID): Promise<void> => {
  await datastore.delete(datastore.key(['Club', clubID]))
}

export const getEvent = async (eventID: EventID): Promise<Event> => {
  const query = datastore
    .createQuery('Event')
    .filter('__key__', '=', datastore.key(['Event', parseInt(eventID)]))
  const event = (await datastore.runQuery(query))[0][0]
  return event
}

export const createEvent = async (fields: Partial<Event>): Promise<Event> => {
  const key = (await datastore.allocateIds(datastore.key('Event'), 1))[0][0]
  const entity = {
    key,
    data: {
      ...fields,
    },
  }
  await datastore.upsert(entity)
  return await getEvent(key.id as string)
}

export const deleteEvent = async (eventID: EventID): Promise<void> => {
  await datastore.delete(datastore.key(['Event', eventID]))
}

export const updateClubSubscription = async (
  userID: UserID,
  clubID: ClubID,
  subscribe: boolean
): Promise<void> => {
  const user = await getUser(userID)
  if (subscribe) {
    if (!user.subscribed.includes(clubID)) {
      const subscribed = [...user.subscribed, clubID]
      await datastore.upsert({
        key: datastore.key(['User', userID]),
        data: { ...user, subscribed },
      })
    }
  } else {
    if (user.subscribed.includes(clubID)) {
      const subscribed = user.subscribed.filter((id) => id !== clubID)
      await datastore.upsert({
        key: datastore.key(['User', userID]),
        data: { ...user, subscribed },
      })
    }
  }
}

export const updateUserAttendingEvent = async (
  userID: UserID,
  eventID: EventID,
  attending: boolean
): Promise<void> => {
  const user = await getUser(userID)

  const events = attending
    ? user.events.includes(eventID)
      ? user.events
      : [...user.events, eventID]
    : user.events.filter((e) => e !== eventID)

  datastore.upsert({ ...user, events })
}
