const Router = require('express').Router()
const exerciseController = require('../Controllers/exerciseController.js')

//Full route: localhost:3001/exercises/**muscle**

Router.get('/', exerciseController.getExercises)
Router.get('/arms', exerciseController.getArmsExercises)
Router.get('/chest', exerciseController.getChestExercises)
Router.get('/shoulders', exerciseController.getShouldersExercises)
Router.get('/back', exerciseController.getBackExercises)
Router.get('/legs', exerciseController.getLegsExercises)
Router.get('/abs', exerciseController.getAbsExercises)

module.exports = Router