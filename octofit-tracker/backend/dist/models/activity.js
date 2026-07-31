"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    type: {
        type: String,
        enum: ['run', 'cycle', 'swim', 'strength', 'yoga', 'walk', 'hiit'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0, default: 0 },
    performedAt: { type: Date, required: true },
}, {
    timestamps: true,
});
const Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.default = Activity;
