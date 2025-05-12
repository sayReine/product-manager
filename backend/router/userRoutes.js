const express = require('express')
const userRoutes = express.Router()
const userController = require('../controller/userController')

userRoutes.post('/register', userController.createUser);
userRoutes.post('/login', userController.login);

userRoutes.get('/allusers', userController.getAllUsers);

module.exports = userRoutes;