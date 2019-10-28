const client = require('../config')
const db = require('../../api/database/config')

const product1={
  name:"mac book",
  price:260000,
  stock:3,
  description:"a tool for programming"
}

user1 = {
  firstName:"test",
	lastName:"testing",
	email:"test@testing.com",
	password:"12346666"
}
var token = ''
beforeAll(async done=>{
  await db.sync({force: true})
  done()
})

afterAll(async done => {
  await db.sync({force: true})
  await db.close()
  done()
});

jest.setTimeout(100000)

describe('test products POST PATCH and DELETE', ()=>{
  it('Test user can signup sucessfully', async done=>{
    const res = await client.post('/api/v1/auth/signup')
    .send(user1)
    .set('Accept', 'application/json')
    expect(res.status).toBe(201)
    done()
  })

  // it('Test user can login successfully', async ()=>{
  //   const res = await client.post('/api/v1/auth/login')
  //   .send(user1)
  //   .set('Accept', 'application/json')
  //   expect(res.status).toBe(200)
  //   token = res.body.token
  //   expect(res.body.message).toBe("you are loged in")
  // })

  // it('Test post a product by authorized user success', async ()=>{
  //   const res = await client.post('/api/v1/products')
  //   .send(product1)
  //   .set('authorization',token)
  //   expect(res.status).toBe(201)
  //   expect(res.body.message).toBe("product created successfully")
  // })

  // it('Test post a product without authorization fails', async ()=>{
  //   const res = await client.post('/api/v1/products')
  //   .send(product1)
  //   .set('Accept', 'application/json')
  //   expect(res.status).toBe(401)
  //   expect(res.body.error).toBe("authorization token missing")
  // })

  // it('Test get all products success', async ()=>{
  //   const res = await client.get('/api/v1/products')
  //   expect(res.status).toBe(200)
  // })

  // it('Test get a product that does not exist fails', async ()=>{
  //   const res = await client.get('/api/v1/products/356')
  //   expect(res.status).toBe(400)
  // })

})