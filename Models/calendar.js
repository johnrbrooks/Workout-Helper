const { Schema } = require('mongoose')

const calendarSchema = new Schema(
    {
        user_id: { type: String },
        days: [{ type: String }],
    }
)

module.exports = calendarSchema