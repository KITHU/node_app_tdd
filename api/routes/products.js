const express = require('express');
const router = express.Router();

const authorization = require('../helperMethods/checktoken')

router.get('/',(req, res, next) => {
    res.status(200).json({
       message: "haddling get request" 
    });
});

router.post('/',authorization,(req, res, next) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }
    res.status(201).json({
       message: "haddling post request", 
       product:req.userData
    });
});

router.get('/:productId',(req, res, next) => {
    res.status(200).json({
       message: "haddling single get request",
       ProductId: req.params.productId
    });
});

router.patch('/:productId',(req, res, next) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }
    res.status(200).json({
       message: "haddling update a request",
       ProductId: req.params.productId,
       product:product
    });
});

router.delete('/:productId',(req, res, next) => {
    res.status(200).json({
       message: 'A product was successfully deleted', 
       ProductId: req.params.productId
    });
});

module.exports = router;