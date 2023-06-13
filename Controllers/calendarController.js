const { Calendar } = require('../Models')
const { Exercises } = require('../Models')
const calendarSchema = require('../Models/calendar')

const getCalendar = async (req, res) => {
    const { username } = req.params
    const userCalendar = await Calendar.findOne({user_username: `${username}`})
    res.json(userCalendar)
}

const getCalendars = async (req, res) => {
    const allCalendars = await Calendar.find()
    res.json(allCalendars)
}

const createCalendar = async (req, res) => {
    try {
        const newCalendar = new Calendar(req.body)
        await newCalendar.save()
        return res.status(201).json({ calendar: newCalendar })
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update function needs to receive...
//user_username (to know which calendar to update)
//day (the key to add the object to)
//exercise (to know what object to add to the calendar)

//user_username
//day
//exercise

const addToCalendar = async (req, res) => {
    try {
        const { updateRequestInfo } = req.params
        const separator = '-'
        const splitLimit = 3
        const splitOne = updateRequestInfo.split(separator, splitLimit)
        let user_username = splitOne[0]
        let day = splitOne[1]
        let exercise = splitOne[2]

        const userCalendar = await Calendar.findOne({ user_username: `${user_username}` })
        if(!userCalendar) {
            return res.status(404).json({ message: 'Calendar not found' })
        }
        const requestedExercise = await Exercises.findOne({ name: `${exercise}` })
        if(!requestedExercise) {
            return res.status(404).json({ message: 'Exercise not found' })
        }

        userCalendar[day].push(requestedExercise)

        await userCalendar.save()

        res.json(userCalendar)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const removeFromCalendar = async (req, res) => {
    try {
        const { updateRequestInfo } = req.params
        const separator = '-'
        const splitLimit = 3
        const splitOne = updateRequestInfo.split(separator, splitLimit)
        let user_username = splitOne[0]
        let day = splitOne[1]
        let exerciseToRemove = splitOne[2]

        const userCalendar = await Calendar.findOne({ user_username: `${user_username}` })
        if(!userCalendar) {
            return res.status(404).json({ message: 'Calendar not found' })
        }

        const exercises = userCalendar[day]
        if(!exercises) {
            return res.status(404).json({ message: 'Day not found'})
        }
        
        const exerciseIndex = exercises.findIndex((exerciseItem) => exerciseItem.name === exerciseToRemove)
        if(exerciseIndex === -1) {
            return res.status(404).json({ message: 'Exercise not found' })
        }

        userCalendar.day = userCalendar.day.filter((exerciseItem, index) => index !== exerciseIndex)

        exercises.splice(exerciseIndex, 1)

        await userCalendar.save()

        res.json(userCalendar)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getCalendar,
    getCalendars,
    createCalendar,
    addToCalendar,
    removeFromCalendar
}