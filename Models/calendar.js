const { Schema } = require('mongoose')

const calendarSchema = new Schema(
    {
        user_username: { type: String, required: true },
        monday: [{ type: Object }],
        tuesday: [{ type: Object }],
        wednesday: [{ type: Object }],
        thursday: [{ type: Object }],
        friday: [{ type: Object }],
        saturday: [{ type: Object }],
        sunday: [{ type: Object }]
    }
)

module.exports = calendarSchema