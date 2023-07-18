const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

let MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI) 
  .then(() => {
    console.log('Successfully connected to remote MongoDB.')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })

mongoose.set('debug', false)
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB Connection Error:")
)
const db = mongoose.connection

module.exports = mongoose.connection