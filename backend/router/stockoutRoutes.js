const express = require('express')
const stockoutRoutes = express.Router();

const stockoutController = require('../controller/stockoutController')

stockoutRoutes.post('/createstockout', stockoutController.createStockout);
stockoutRoutes.get('/allstockout', stockoutController.getAllStockout);
// stocoutRoutes.put('/updatestockin/:id', stockoutController.updatedStockin);
// stockoutRoutes.delete('/deletestockin/:id', stockoutController.deleteStockin);

module.exports = stockoutRoutes;