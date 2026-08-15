"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
// GET /api/teams - Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.Team.find().populate('members');
        res.json({ message: 'Get all teams', data: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// GET /api/teams/:id - Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findById(id).populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Get team ${id}`, data: team });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// POST /api/teams - Create a new team
router.post('/', async (req, res) => {
    try {
        const team = await Team_1.Team.create(req.body);
        res.status(201).json({ message: 'Team created', data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// PUT /api/teams/:id - Update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findByIdAndUpdate(id, req.body, { new: true }).populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Team ${id} updated`, data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Team ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
exports.default = router;
//# sourceMappingURL=teams.js.map