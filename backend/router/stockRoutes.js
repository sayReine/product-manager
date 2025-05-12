const express = require('express');
const stockRoutes = express.Router();
const reportController = require('../controller/reportController');

stockRoutes.get('/report', reportController.getPeriodicalReport);

module.exports = stockRoutes;