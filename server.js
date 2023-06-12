const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3001
const db = require('./db')
const { Exercises, Users } = require('./Models')
const AppRouter = require('./Routes/AppRouter')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes

app.get('/', (req, res) => {res.send('Server works!')})
app.use('/', AppRouter)
app.listen(PORT, () => {console.log(`Express server listening on port ${PORT}`)})

/* app.get('/users', async (req, res) => {
  let usersAll = await Users.find()
  res.json(usersAll)
}) */

/* app.get('/exercises', async (req, res) => {
  let exercisesAll = await Exercises.find()
  res.json(exercisesAll)
}) */