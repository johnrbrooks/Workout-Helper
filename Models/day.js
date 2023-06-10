const { Schema } = require('mongoose')

const daySchema = new Schema(
    {
        calendar_id: { type: String },
    }
)

module.exports = daySchema