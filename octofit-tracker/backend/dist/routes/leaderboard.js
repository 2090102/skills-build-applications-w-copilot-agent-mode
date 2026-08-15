"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
// GET /api/leaderboard - Get leaderboard rankings
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find()
            .sort({ rank: 1 })
            .populate('userId')
            .populate('teamId');
        res.json({ message: 'Get leaderboard', data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET /api/leaderboard/team/:teamId - Get team leaderboard
router.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const leaderboard = await Leaderboard_1.Leaderboard.find({ teamId })
            .sort({ rank: 1 })
            .populate('userId');
        res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// GET /api/leaderboard/user/:userId - Get user rank
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userRank = await Leaderboard_1.Leaderboard.findOne({ userId }).populate('userId').populate('teamId');
        if (!userRank) {
            return res.status(404).json({ error: 'User rank not found' });
        }
        res.json({ message: `Get rank for user ${userId}`, data: userRank });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user rank' });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map