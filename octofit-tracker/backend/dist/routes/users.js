"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_req, res) => {
    try {
        const users = await user_1.default.find().populate('team', 'name city').lean();
        res.json({
            resource: 'users',
            count: users.length,
            items: users,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch users',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = usersRouter;
