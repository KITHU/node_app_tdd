const express = require('express')
const router = express.Router()

router.get('/',(req, res, next) => {
    res.status(200).json({
        message:"Get all the orders"
    });
});

router.post('/',(req, res, next) => {
    order = {
        name: req.body.name
    }
    res.status(200).json({
        message:"post orders.",
        order: order
    });
});

router.get('/:orderId',(req, res, next) => {
    res.status(200).json({
        message:'Get a single orders',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId',(req, res, next) => {
    res.status(200).json({
        message:"Delete  an orders",
        orderId: req.params.orderId
    });
});

module.exports = router;