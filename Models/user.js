const { Schema } = require('mongoose')

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        pref_exercises: [{ type: String }]
    }
)

module.exports = userSchema