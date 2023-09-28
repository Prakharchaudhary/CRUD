const express = require('express');
const user_route = express()
const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));
const userController = require('../controllers/userController')

user_route.post('/AddUser',userController.addUser)
user_route.get('/GetUser/:userId',userController.getUser)
user_route.patch('/updateUser/:userId',userController.updateUser)
user_route.delete('/deleteUser/:userId',userController.deleteUser)







module.exports =user_route
