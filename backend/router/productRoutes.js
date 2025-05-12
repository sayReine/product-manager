const express = require('express')
const productRoutes = express.Router()

const productController = require('../controller/productController')

productRoutes.post('/createproduct', productController.createProduct);
productRoutes.get('/allproducts', productController.getAllProduct);
productRoutes.put('/updateproduct/:id', productController.updateProduct);
productRoutes.delete('/deleteproduct/:id', productController.deleteProduct);

module.exports = productRoutes;