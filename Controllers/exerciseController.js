const { Phone } = require('../models')
const phoneSchema = require('../models/phone')


const getPhones = async (req, res)=> {
    const cellphones = await Phone.find()
    res.json(cellphones)
}

const createPhone = async (req, res) => {
    try {
        const phone = await new Phone(req.body)
        await phone.save()
        return res.status(201).json({
            phone,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getPhones,
    getPhonesById,
    updatePhone
}