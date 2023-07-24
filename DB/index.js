const mongoose = require('mongoose')
const { MONGO_PW } = require("../config")
const dotenv = require('dotenv')

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

//const MONGODB_URI = `mongodb+srv://quark934:${MONGO_PW}@myfitnessplanner.jgvzdwg.mongodb.net/test?retryWrites=true&w=majority`

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
