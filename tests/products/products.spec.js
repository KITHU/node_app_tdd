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
afterAll(async () => {
  await db.sync({force: true})
});

describe('test products get one and get all',()=>{
    it('Test get all products success', async done=>{
        const res = await client.get('/api/v1/products')
        expect(res.status).toBe(200)
        done()
    })

    it('Test get a product that does not exist fails', async done=>{
        const res = await client.get('/api/v1/products/356')
        expect(res.status).toBe(400)
        done()
    })

    it('Test post a product without authorization fails', async done=>{
        const res = await client.post('/api/v1/products')
        .send(product1)
        .set('Accept', 'application/json')
        expect(res.status).toBe(401)
        expect(res.body.error).toBe("authorization token missing")
        done()
    })

})

describe('test products POST PATCH and DELETE',()=>{
  it('Test user can signup sucessfully', async done=>{
    const res = await client.post('/api/v1/auth/signup')
    .send(user1)
    .set('Accept', 'application/json')
    expect(res.status).toBe(201)
    done()
  })

  it('Test user can login successfully', async done=>{
    const res = await client.post('/api/v1/auth/login')
    .send(user1)
    .set('Accept', 'application/json')
    expect(res.status).toBe(200)
    token = res.body.token
    expect(res.body.message).toBe("you are loged in")
    done()
})

  it('Test post a product by authorized user success', async done=>{
    const res = await client.post('/api/v1/products')
    .send(product1)
    .set('authorization',token)
    expect(res.status).toBe(201)
    expect(res.body.message).toBe("product created successfully")
    done()
  })

})