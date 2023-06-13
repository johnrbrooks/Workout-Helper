const Router = require('express').Router()
const userController = require('../Controllers/userController.js')

//Full route: localhost:3001/users/**username**

Router.get('/', userController.getUsers)
Router.get('/:username', userController.getUser)
Router.get('/login/:usernamepassword', userController.getLoginInfo)
Router.post('/createuser', userController.createUser)

module.exports = Router