const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3001
const db = require('./DB/index')
const { Exercises, Users } = require('./Models')
const AppRouter = require('./Routes/AppRouter')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes

app.use('/api', AppRouter)

app.use(express.static(path.join(__dirname, 'Client')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'index.html'))
})
app.listen(PORT, () => {console.log(`Express server listening on port ${PORT}`)})
