import app from '../../app'
import { agent as request } from 'supertest'
import { expect } from 'chai'
import { signupUser, deleteUser } from '../../src/services/datastore'
import { v4 as uuidv4 } from 'uuid'

const TEST_USER_UID = uuidv4()
const TEST_USER_NAME = 'Temporary Test User'
const TEST_USER_EMAIL = 'test@test.com'
const TEST_USER_RMITID = 's3888888'

describe('/retrieveDSUser route', () => {
  before(async function () {
    await signupUser(TEST_USER_UID, {
      username: TEST_USER_NAME,
      email: TEST_USER_EMAIL,
      rmitID: TEST_USER_RMITID,
    })
  })

  after(async function () {
    await deleteUser(TEST_USER_UID)
  })

  it('should fail when no query parameters provided', async function () {
    const res = await request(app).get('/retrieveDSUser').send()
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
  })
  it('should return a 404 for a non existent user', async function () {
    const res = await request(app).get('/retrieveDSUser?uid=-1').send()
    expect(res.status).to.equal(404)
    expect(res.body).not.to.be.undefined
    expect(res.body.success).to.be.false
    expect(res.body.error).to.be.an('object')
  })
  it('should return a valid user', async function () {
    const res = await request(app).get(`/retrieveDSUser?uid=${TEST_USER_UID}`).send()
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body.success).to.be.true
    expect(res.body.error).to.be.undefined
    expect(res.body.user).to.be.an('object')
    expect(res.body.user.username).to.be.a('string')
    expect(res.body.user.email).to.be.a('string')
    expect(res.body.user.icon).to.be.a('string')
    expect(res.body.user.rmitID).to.be.a('string')
    expect(res.body.user.superadmin).to.be.a('boolean')
    expect(res.body.user.subscribed).to.be.an('array')
    expect(res.body.user.events).to.be.an('array')
    expect(res.body.user.adminClubs).to.be.an('array')
    expect(res.body.uid).to.be.a('string')
  })
  it('should return the correct user', async function () {
    const res = await request(app).get(`/retrieveDSUser?uid=${TEST_USER_UID}`).send()
    expect(res.body.user.username).to.equal(TEST_USER_NAME)
    expect(res.body.user.email).to.equal(TEST_USER_EMAIL)
    expect(res.body.user.rmitID).to.equal(TEST_USER_RMITID)
    expect(res.body.uid).to.equal(TEST_USER_UID)
  })
})
