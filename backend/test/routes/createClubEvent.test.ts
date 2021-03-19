import app from '../../src/app'
import { agent as request } from 'supertest'
import { expect } from 'chai'
import { deleteEvent } from '../../src/services/datastore'

const TEST_EVENT = {
  name: 'Temp Test Event',
  location: 'Test Location',
  hostingClubs: [],
  description: 'A temporary test event',
  date: Date.now(),
}

const TEST_EVENT_PARAMS = {
  ...TEST_EVENT,
  hostingClubs: JSON.stringify(TEST_EVENT.hostingClubs),
  date: String(TEST_EVENT.date),
}

describe('/createClubEvent route', () => {
  it('should fail when no body parameters provided', async function () {
    const res = await request(app).post('/createClubEvent').send()
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
  })
  it('should return a valid event', async function () {
    const res = await request(app).post(`/createClubEvent`).send(TEST_EVENT_PARAMS)
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body.success).to.be.true
    expect(res.body.error).to.be.undefined
    expect(res.body.event).to.be.an('object')
    expect(res.body.event.name).to.be.a('string')
    expect(res.body.event.description).to.be.a('string')
    expect(res.body.event.location).to.be.a('string')
    expect(res.body.event.date).to.be.a('number')
    expect(res.body.event.image).to.be.a('string')
    expect(res.body.event.hostingClubs).to.be.an('array')
    await deleteEvent(res.body.event.id)
  })
  it('should return the correct event', async function () {
    const res = await request(app).post(`/createClubEvent`).send(TEST_EVENT_PARAMS)
    expect(res.body.event.name).to.be.equal(TEST_EVENT.name)
    expect(res.body.event.location).to.be.equal(TEST_EVENT.location)
    expect(res.body.event.hostingClubs).to.be.deep.equal(TEST_EVENT.hostingClubs)
    expect(res.body.event.description).to.be.equal(TEST_EVENT.description)
    expect(res.body.event.date).to.be.equal(TEST_EVENT.date)
    await deleteEvent(res.body.event.id)
  })
})
