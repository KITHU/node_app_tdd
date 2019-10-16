# EXAMPLE OF A SHOPPING CART

## Description
This is a simple implementation of a sample Shopping cart using node/expess to power the backend and postgres as the database.

## Development
#### Stacks
- javaScript
- nodejs
- express
#### Database
* postgres

## Features
customers can view products
customers can create orders
customer can checkout
customers can create an account
customer can login 

## end points
| endpoint                 |  Features                         |
| -------------------------|-----------------------------------|
| POST api/v1/auth/signup        | create a new user           |
| POST api/v1/auth/login         | enables a user to login     |
| GET api/v1/v1/products         | retrives all the products   |
| GET api/v1/products/:id        | retrive a specific product  |
| POST api/v1/products           | create a product            |
| PATCH api/v1/products/:id      | update a products           |
| DELETE api/v1/products/:id     | delete a product            |
## local setup and testing using postman
1. Clone this [repo](https://github.com/KITHU/node_app_tdd.git)
2. cd into the project `cd node_app_tdd`
3. install all the dependances `npm install`
4. run the project `npm start`
5. Go to postman and interact with the app



