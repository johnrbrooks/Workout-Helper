const mongoose  = require('mongoose')
const userSchema = require('./user')
const exerciseSchema = require('./exercise')
const calendarSchema = require('./calendar')

const Users = mongoose.model('Users', userSchema)
const Exercises = mongoose.model('Exercises', exerciseSchema)
const Calendar = mongoose.model('Calender', calendarSchema)

module.exports = {
  Users,
  Exercises,
  Calendar
}