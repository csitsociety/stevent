import app from '../../app'
import { agent as request } from 'supertest'
import { expect } from 'chai'
import { createEvent, deleteEvent } from '../../src/services/datastore'

const TEST_EVENT = {
  name: 'Temp Test Event',
  location: 'Test Location',
  hostingClubs: [],
  description: 'A temporary test event',
  date: Date.now(),
  image: '',
}

describe('/retrieveEventDetails route', () => {
  let testEventID: string

  before(async function () {
    const event = await createEvent(TEST_EVENT)
    testEventID = event.id
  })

  after(async function () {
    await deleteEvent(testEventID)
  })

  it('should fail when no query parameters provided', async function () {
    const res = await request(app).get('/retrieveEventDetails').send()
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
  })
  it('should return a 404 for a non existent event', async function () {
    const res = await request(app).get('/retrieveEventDetails?eventID=-1').send()
    expect(res.status).to.equal(404)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
  })
  it('should return a valid event', async function () {
    const res = await request(app).get(`/retrieveEventDetails?eventID=${testEventID}`).send()
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body.success).to.be.true
    expect(res.body.error).to.be.undefined
    expect(res.body.event).to.be.an('object')
  })
  it('should return the correct user', async function () {
    const res = await request(app).get(`/retrieveEventDetails?eventID=${testEventID}`).send()
    expect(res.body.event.id).to.be.equal(testEventID)
    expect(res.body.event.name).to.be.a('string')
    expect(res.body.event.description).to.be.a('string')
    expect(res.body.event.location).to.be.a('string')
    expect(res.body.event.date).to.be.a('number')
    expect(res.body.event.image).to.be.a('string')
    expect(res.body.event.hostingClubs).to.be.an('array')
  })
})
