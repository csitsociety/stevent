import app from '../../src/app'
import { agent as request } from 'supertest'
import { expect } from 'chai'
import { createClub, deleteClub } from '../../src/services/datastore'

const TEST_CLUB_ID = '999'
const TEST_CLUB_NAME = 'Temp Test Club'
const TEST_CLUB_DESC = 'Temporarily created club for API testing'
const TEST_CLUB_DISCORD = 'http://discord.gg/blahblah'
const TEST_CLUB_JOIN = 'http://stevent.club'
const TEST_CLUB_ICON = 'syke'

describe('/retrieveClubDetails route', () => {
  before(async function () {
    await createClub(TEST_CLUB_ID, {
      name: TEST_CLUB_NAME,
      description: TEST_CLUB_DESC,
      discord: TEST_CLUB_DISCORD,
      joinLink: TEST_CLUB_JOIN,
      icon: TEST_CLUB_ICON,
    })
  })

  after(async function () {
    await deleteClub(TEST_CLUB_ID)
  })

  it('should fail when no query parameters provided', async function () {
    const res = await request(app).get('/retrieveClubDetails').send()
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
  })
  it('should return a 404 for a non existent club', async function () {
    const res = await request(app).get('/retrieveClubDetails?clubID=-1').send()
    expect(res.status).to.equal(404)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
  })
  it('should return a valid club', async function () {
    const res = await request(app).get(`/retrieveClubDetails?clubID=${TEST_CLUB_ID}`).send()
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body.success).to.be.true
    expect(res.body.error).to.be.undefined
    expect(res.body.club).to.be.an('object')
  })
  it('should return the correct user', async function () {
    const res = await request(app).get(`/retrieveClubDetails?clubID=${TEST_CLUB_ID}`).send()
    expect(res.body.club.id).to.be.equal(TEST_CLUB_ID)
    expect(res.body.club.name).to.be.a('string')
    expect(res.body.club.description).to.be.a('string')
    expect(res.body.club.discord).to.be.a('string')
    expect(res.body.club.joinLink).to.be.a('string')
    expect(res.body.club.icon).to.be.a('string')
  })
})
