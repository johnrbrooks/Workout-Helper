const Router = require('express').Router()

const ExerciseRouter = require('./exercisesRouter.js')
const UserRouter = require('./userRouter.js')

Router.use('/exercises', ExerciseRouter)
Router.use('/users', UserRouter)

module.exports = Router