const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const MONGO_PW = process.env.MONGO_PW
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URILOCAL = `mongodb+srv://quark934:${MONGO_PW}@myfitnessplanner.jgvzdwg.mongodb.net/?retryWrites=true&w=majority`

mongoose
  .connect(MONGODB_URILOCAL) 
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