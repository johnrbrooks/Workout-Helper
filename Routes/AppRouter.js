const Router = require('express').Router()

const ExerciseRouter = require('./exercisesRouter.js')
const UserRouter = require('./userRouter.js')
const CalendarRouter = require('./calendarRouter.js')

Router.use('/exercises', ExerciseRouter)
Router.use('/users', UserRouter)
Router.use('/calendars', CalendarRouter)

module.exports = Router