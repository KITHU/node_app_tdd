const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const Sequelize = require('sequelize');


const productRouter = require("./api/routes/products")
const orderRouter = require("./api/routes/orders")
const userRouter = require("./api/routes/users")

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, GET, PATCH, DELETE, POST')
        return res.status(200).json({})
    }
    next()
})

app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/auth', userRouter)

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;