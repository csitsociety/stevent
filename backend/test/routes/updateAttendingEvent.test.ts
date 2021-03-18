import app from '../../app'
import { agent as request } from 'supertest'
import { expect } from 'chai'
import { v4 as uuidv4 } from 'uuid'
import {
  createEvent,
  deleteEvent,
  signupUser,
  updateUserAttendingEvent,
  deleteUser,
  getUser,
} from '../../src/services/datastore'

const TEST_EVENT = {
  name: 'Temp Test Event B',
  location: 'Test Location',
  hostingClubs: [],
  description: 'A temporary test event',
  date: Date.now(),
  image: '',
}

const TEST_USER = {
  id: uuidv4(),
  username: 'Temporary Test Attendee B',
  email: 'attendeeB@test.com',
  rmitID: 's3888884',
}

describe('/updateAttendingEvent route', () => {
  let testEventID: string

  before(async function () {
    // Create test event
    const event = await createEvent(TEST_EVENT)
    testEventID = event.id

    // Create test users
    await signupUser(TEST_USER.id, TEST_USER)

    // Sign up one test user for test event
  })

  after(async function () {
    await deleteEvent(testEventID)
    await deleteUser(TEST_USER.id)
  })

  it('should fail when no body parameters provided', async function () {
    const res = await request(app).post('/updateAttendingEvent').send()
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
    expect(res.body.attendingUsers).to.be.undefined
  })
  it('should return a 404 for a non existent event', async function () {
    const res = await request(app)
      .post('/updateAttendingEvent')
      .send({ userID: TEST_USER.id, eventID: '-1', state: true })
    expect(res.status).to.equal(404)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
    expect(res.body.attendingUsers).to.be.undefined
  })
  it('should return a 404 for a non existent user', async function () {
    const res = await request(app)
      .post('/updateAttendingEvent')
      .send({ userID: '-1', eventID: testEventID, state: true })
    expect(res.status).to.equal(404)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
    expect(res.body.attendingUsers).to.be.undefined
  })
  it('should add the event to the users events', async function () {
    // Set attending to false
    await updateUserAttendingEvent(TEST_USER.id, testEventID, false)

    // Send the POST
    const res = await request(app)
      .post('/updateAttendingEvent')
      .send({ userID: TEST_USER.id, eventID: testEventID, state: true })

    // Expect succesfull request
    expect(res.status).to.equal(200)
    expect(res.body.state).to.equal(true)

    // Check updated succesfully
    const user = await getUser(TEST_USER.id)
    expect(user.events).include(testEventID)
  })
  it('should remove the event from the users events', async function () {
    // Set attending to true
    await updateUserAttendingEvent(TEST_USER.id, testEventID, true)

    // Send the POST
    const res = await request(app)
      .post('/updateAttendingEvent')
      .send({ userID: TEST_USER.id, eventID: testEventID, state: false })

    // Expect succesfull request
    expect(res.status).to.equal(200)
    expect(res.body.state).to.equal(false)

    // Check updated successfully
    const user = await getUser(TEST_USER.id)
    expect(user.events).not.include(testEventID)
  })
})
