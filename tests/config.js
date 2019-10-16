const supertest = require('supertest')
const app = require('../app')

const client = supertest(app)

module.exports = client