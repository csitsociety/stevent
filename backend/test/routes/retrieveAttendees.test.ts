import app from '../../app'
import { agent as request } from 'supertest'
import { expect } from 'chai'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../../src/api.d'
import {
  createEvent,
  deleteEvent,
  signupUser,
  updateUserAttendingEvent,
  deleteUser,
} from '../../src/services/datastore'

const TEST_EVENT = {
  name: 'Temp Test Event',
  location: 'Test Location',
  hostingClubs: [],
  description: 'A temporary test event',
  date: Date.now(),
  image: '',
}

const TEST_USER = {
  id: uuidv4(),
  username: 'Temporary Test Attendee',
  email: 'attendee@test.com',
  rmitID: 's3888882',
}

describe('/retrieveAttendees route', () => {
  let testEventID: string

  before(async function () {
    // Create test event
    const event = await createEvent(TEST_EVENT)
    testEventID = event.id

    // Create test user
    await signupUser(TEST_USER.id, TEST_USER)

    // Sign up test user for test event
    await updateUserAttendingEvent(TEST_USER.id, testEventID, true)
  })

  after(async function () {
    await deleteEvent(testEventID)
    await deleteUser(TEST_USER.id)
  })

  it('should fail when no query parameters provided', async function () {
    const res = await request(app).get('/retrieveAttendees').send()
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
    expect(res.body.attendingUsers).to.be.undefined
  })
  it('should return a 404 for a non existent event', async function () {
    const res = await request(app).get('/retrieveAttendees?eventID=-1').send()
    expect(res.status).to.equal(404)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
    expect(res.body.attendingUsers).to.be.undefined
  })
  it('should return valid users', async function () {
    const res = await request(app).get(`/retrieveAttendees?eventID=${testEventID}`).send()
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.true
    expect(res.body.error).to.be.undefined
    expect(res.body.attendingUsers).to.be.an('array')
    const head = res.body.attendingUsers[0]
    expect(head).to.be.an('object')
    expect(head.username).to.be.a('string')
    expect(head.email).to.be.a('string')
    expect(head.icon).to.be.a('string')
    expect(head.rmitID).to.be.a('string')
    expect(head.superadmin).to.be.a('boolean')
    expect(head.subscribed).to.be.an('array')
    expect(head.events).to.be.an('array')
    expect(head.adminClubs).to.be.an('array')
  })
  it('should return the correct users', async function () {
    const res = await request(app).get(`/retrieveAttendees?eventID=${testEventID}`).send()
    const ids = res.body.attendingUsers.map((user: User) => user.id)
    expect(ids).to.include(TEST_USER.id)
  })
})
