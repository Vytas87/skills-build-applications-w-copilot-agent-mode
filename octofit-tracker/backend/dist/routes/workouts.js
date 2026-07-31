"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res) => {
    try {
        const suggestions = await workout_1.default.find().sort({ isTemplate: -1, createdAt: -1 }).lean();
        res.json({
            resource: 'workouts',
            count: suggestions.length,
            suggestions,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch workouts',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = workoutsRouter;
