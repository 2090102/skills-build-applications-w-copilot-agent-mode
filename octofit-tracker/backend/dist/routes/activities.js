"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
// GET /api/activities - Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('userId');
        res.json({ message: 'Get all activities', data: activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findById(id).populate('userId');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: `Get activity ${id}`, data: activity });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// POST /api/activities - Log a new activity
router.post('/', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.create(req.body);
        res.status(201).json({ message: 'Activity logged', data: activity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to log activity' });
    }
});
// PUT /api/activities/:id - Update activity
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findByIdAndUpdate(id, req.body, { new: true }).populate('userId');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: `Activity ${id} updated`, data: activity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
});
// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: `Activity ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
exports.default = router;
//# sourceMappingURL=activities.js.map