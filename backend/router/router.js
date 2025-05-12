const express = require('express')
const router = express.Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const stockinRoutes = require('./stockinRoutes');
const stockoutRoutes = require('./stockoutRoutes');
const stockRoutes = require('./stockRoutes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/stockin', stockinRoutes);
router.use('/stockout', stockoutRoutes);
router.use('/stock', stockRoutes);

module.exports = router; 