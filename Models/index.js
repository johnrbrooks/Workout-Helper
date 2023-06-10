const mongoose  = require('mongoose')
const userSchema = require('./user')
const exerciseSchema = require('./exercise')

const Users = mongoose.model('Users', userSchema)
const Exercises = mongoose.model('Exercises', exerciseSchema)

module.exports = {
  Users,
  Exercises,
}