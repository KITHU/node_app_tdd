const express = require('express');
const router = express.Router();

const authorization = require('../helperMethods/checktoken')
const Product = require('../database/models/Product')
const fValidator = require('../helperMethods/checkRequireFormFields')

// get all products
router.get('/',(req, res, next) => {
  result = []
  Product.findAll()
  .then(data=>{
    if (data.length === 0){
      res.status(200).json({
      products: data
      });
    }else{
      data.map(row=>{
        result.push(row.dataValues)
      })
      console.log(result)
      res.status(200).json({
      products: result
      });
    }
  })
  .catch(err =>{
    res.status(401).json({
      error:err
    })
  })
});

// create product route
router.post('/',authorization,(req, res, next) => {
  let request = req.body
  const arrfields = ['name', 'description', 'price', 'stock']
  fValidator(arrfields,request,res)
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    userId: req.userData.id
  }
  Product.findOne({where:{
    name:product.name
  }})
  .then(data=>{
    if (data){
      res.status(400).json({
        error:'this product already exist'
      });
    }else{
      Product.create(product)
      .then(data=>{
        res.status(201).json({
          message: "product created successfully",
          data:data
        });
      })
      .catch(err=>{
        res.status(400).json({
          error:err
        });
      });
    }
  })
  .catch(err=>{
    res.status(400).json({
      error:err
    });
  });
});

// get a single product
router.get('/:productId',(req, res, next) => {
  id = parseInt(req.params.productId)
  result = []
  Product.findAll({where:{id:id}})
  .then(data=>{
    data.map(row=>{console.log(row.dataValues)})
    if (data.length === 0){
      res.status(400).json({
      error: `product id ${id} does not exist`
      });
    }else{
      data.map(res=>{
        result = res.dataValues
      })
      res.status(200).json({
        products:result
      })
    }
  })
  .catch(err =>{
    res.status(401).json({
      error:err
      })
    })
  });

// update a product
router.patch('/:productId',authorization,(req, res, next) => {
  id = parseInt(req.params.productId)
  prod = {
    name:req.body.name,
    price:req.body.price,
    stock:req.body.stock,
    description:req.body.description
  }
  Product.findOne({where:{id:id}})
  .then(data=>{
    if(!data){
      res.status(400).json({
        error: `A product with this productId=${id} does not exist` 
      })
    }else{
      Product.update(prod,{where:{id:id}})
      .then(data=>{
        res.status(200).json({
          message:data
        })
      })
      .catch(err=>{
        res.status(400).json({
          error:err
        })
      })
    }
  })
  .catch(err=>{
    res.status(400).json({
      error:err
    })
  })
});

// delete a product
router.delete('/:productId', authorization,(req, res, next) => {
  userId = req.userData.id
  id = parseInt(req.params.productId)

  Product.findOne({where:{id:id}})
  .then(dar => {
    if (!dar){
      res.status(400).json({
        error: `A product with this productId=${id} does not exist`
      });
    }else{
      Product.destroy({where:{id:id}},{where:{userId:userId}})
      .then(data=>{
        res.status(200).json({
          message: 'A product was successfully deleted', 
          ProductId: data
        });
      })
      .then(err=>{
        res.status(200).json({
          error: err
        });
      })
    }
  })
  .then(err=>{
    console.log(err)
  })
});

module.exports = router;