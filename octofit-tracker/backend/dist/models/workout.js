"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['strength', 'cardio', 'mobility', 'recovery'], required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String, trim: true }],
    focusAreas: [{ type: String, trim: true }],
    recommendedForFitnessLevels: [
        {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
        },
    ],
    isTemplate: { type: Boolean, default: true },
}, {
    timestamps: true,
});
const Workout = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
