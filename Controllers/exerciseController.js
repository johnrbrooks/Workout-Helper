const { Exercises, Users } = require('../Models')
const exerciseSchema = require('../Models/exercise')
const userSchema = require('../Models/user')


const getExercises = async (req, res) => {
    const exercisesAll = await Exercises.find()
    res.json(exercisesAll)
}

const getArmsExercises = async (req, res) => {
    try{
        const armExercises = await Exercises.find({muscle_category: 'Arms'})
        res.json(armExercises)
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getChestExercises = async (req, res) => {
    try{
        const chestExercises = await Exercises.find({muscle_category: 'Chest'})
        res.json(chestExercises)
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getShouldersExercises = async (req, res) => {
    try{
        const shoulderExercises = await Exercises.find({muscle_category: 'Shoulders'})
        res.json(shoulderExercises)
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getBackExercises = async (req, res) => {
    try{
        const backExercises = await Exercises.find({muscle_category: 'Back'})
        res.json(backExercises)
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getLegsExercises = async (req, res) => {
    try{
        const legExercises = await Exercises.find({muscle_category: 'Legs'})
        res.json(legExercises)
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAbsExercises = async (req, res) => {
    try{
        const abExercises = await Exercises.find({muscle_category: 'Abs'})
        res.json(abExercises)
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/* const createUser = async (req, res) => {
    try {
        const user = await new user(req.body)
        await Users.save()
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
} */

module.exports = {
    getExercises,
    getArmsExercises,
    getChestExercises,
    getShouldersExercises,
    getBackExercises,
    getLegsExercises,
    getAbsExercises,
}