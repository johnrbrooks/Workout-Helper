const { Schema } = require('mongoose')

const exerciseSchema = new Schema(
    {
        image: { type: String, required: true },
        muscle_image: { type: String, required: true },
        name: { type: String, required: true },
        instructions: [{ type: String, required: true }],
        reps: { type: String, required: true },
        equipment: { type: Boolean, required: true },
        muscle_category: { type: String, required: true },
        primary_muscle_id: { type: String, required: true },
        secondary_muscle_id: { type: String, required: true }
    }
)

module.exports = exerciseSchema