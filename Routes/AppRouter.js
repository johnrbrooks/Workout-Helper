const Router = require('express').Router()

const ExerciseRouter = require('./exercisesRouter.js')

Router.use('/exercises', ExerciseRouter)

module.exports = Router