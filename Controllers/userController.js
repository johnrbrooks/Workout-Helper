const { Users } = require('../Models')
const userSchema = require('../Models/user')

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

module.exports = {
    createUser,
    getUser,
    getUsers,
    getLoginInfo
}