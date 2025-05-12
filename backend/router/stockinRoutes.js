const express = require('express')
const stockinRoutes = express.Router();

const stockinController = require('../controller/stockinController')

stockinRoutes.post('/createstockin', stockinController.createStockin);
stockinRoutes.get('/allstockin', stockinController.getAllStockin);
// stockinRoutes.put('/updatestockin/:id', stockinController.updatedStockin);
// stockinRoutes.delete('/deletestockin/:id', stockinController.deleteStockin);

module.exports = stockinRoutes;