const { Users } = require('../Models')
const { Calendar } = require('../Models')
const userSchema = require('../Models/user')
const calendarSchema = require('../Models/calendar')

const createUser = async (req, res) => {
    try {
        const newUser = new Users(req.body)
        await newUser.save()
        return res.status(201).json({ user: newUser })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const { username } = req.params
        const user = await Users.find({username: `${username}`})
        res.json(user)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    } 
}

const getLoginInfo = async (req, res) => {
    try {
        const { usernamepassword } = req.params
        const separator = '-'
        const splitLimit = 2
        const loginInfo = usernamepassword.split(separator, splitLimit)
        username = loginInfo[0]
        password = loginInfo[1]
        const user = await Users.findOne({ username: `${username}` })
        if(user && user.password === password) {
            console.log('Login Successful!')
            res.json(user)
        } else {
            console.log('Wrong Password')
            res.status(500).json({ error: error.message })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    } 
}

const getUsers = async (req, res) => {
    try {
        const usersAll = await Users.find()
        res.json(usersAll)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    } 
}

const deleteUser = async (req, res) => {
    try {
        const { deleteRequestInfo } = req.params
        let username = deleteRequestInfo

        const userCalendar = await Calendar.deleteOne({ user_username: `${username}`})
        if(!userCalendar) {
            return res.status(404).json({ message: 'Calendar not found' })
        }

        const userData = await Users.deleteOne({ username: `${username}` })
        if(!userData) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(`${username}'s account and calendar has been deleted!`)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    getLoginInfo,
    deleteUser
}