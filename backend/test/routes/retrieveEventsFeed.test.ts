import app from '../../app'
import { agent as request } from 'supertest'
import { expect } from 'chai'
import { createEvent, deleteEvent } from '../../src/services/datastore'
import { Event } from '../../src/api.d'

const TEST_EVENT = {
  name: 'Temp Test Event',
  location: 'Test Location',
  hostingClubs: [],
  description: 'A temporary test event',
  date: Date.now(),
  image: '',
}

describe('/retrieveEventsFeed route', () => {
  let testEventID: string

  before(async function () {
    const event = await createEvent(TEST_EVENT)
    testEventID = event.id
  })

  after(async function () {
    await deleteEvent(testEventID)
  })

  it('should return valid events', async function () {
    const res = await request(app).get(`/retrieveEventsFeed`).send()
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body.success).to.be.true
    expect(res.body.error).to.be.undefined
    expect(res.body.events).to.be.an('array')
    const head = res.body.events[0]
    expect(head.name).to.be.a('string')
    expect(head.id).to.be.a('string')
    expect(head.description).to.be.a('string')
    expect(head.location).to.be.a('string')
    expect(head.date).to.be.a('number')
    expect(head.image).to.be.a('string')
    expect(head.hostingClubs).to.be.an('array')
  })
  it('should return the correct events', async function () {
    const res = await request(app).get(`/retrieveEventsFeed`).send()
    const ids = res.body.events.map((e: Event) => e.id)
    expect(ids).to.include(testEventID)
  })
})
