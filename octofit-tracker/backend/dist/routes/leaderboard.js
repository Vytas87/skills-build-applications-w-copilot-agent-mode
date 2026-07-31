"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res) => {
    try {
        const rankings = await leaderboard_1.default.find().populate('entries.user', 'name').lean();
        res.json({
            resource: 'leaderboard',
            count: rankings.length,
            rankings,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch leaderboard',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = leaderboardRouter;
