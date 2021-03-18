import app from '../../src/app'
import { agent as request } from 'supertest'
import { expect } from 'chai'
import { createClub, deleteClub } from '../../src/services/datastore'
import { Club } from '../../src/api.d'

const TEST_CLUB_ID = '999'
const TEST_CLUB_NAME = 'Temp Test Club'
const TEST_CLUB_DESC = 'Temporarily created club for API testing'
const TEST_CLUB_DISCORD = 'http://discord.gg/blahblah'
const TEST_CLUB_JOIN = 'http://stevent.club'
const TEST_CLUB_ICON = 'syke'

describe('/retrieveClubs route', () => {
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

  it('should return valid clubs', async function () {
    const res = await request(app).get(`/retrieveClubs`).send()
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body.success).to.be.true
    expect(res.body.error).to.be.undefined
    expect(res.body.clubs).to.be.an('array')
    const head = res.body.clubs[0]
    expect(head.id).to.be.a('string')
    expect(head.name).to.be.a('string')
    expect(head.description).to.be.a('string')
    expect(head.discord).to.be.a('string')
    expect(head.icon).to.be.a('string')
    expect(head.joinLink).to.be.a('string')
  })

  it('should return the correct clubs', async function () {
    const res = await request(app).get(`/retrieveClubs`).send()
    const ids = res.body.clubs.map((c: Club) => c.id)
    expect(ids).to.include(TEST_CLUB_ID)
  })
})
