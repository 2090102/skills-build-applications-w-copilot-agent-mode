"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
// GET /api/workouts - Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().populate('userId');
        res.json({ message: 'Get all workouts', data: workouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findById(id).populate('userId');
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({ message: `Get workout ${id}`, data: workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// POST /api/workouts - Create a new workout suggestion
router.post('/', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.create(req.body);
        res.status(201).json({ message: 'Workout suggestion created', data: workout });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findByIdAndUpdate(id, req.body, { new: true }).populate('userId');
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({ message: `Workout ${id} updated`, data: workout });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findByIdAndDelete(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({ message: `Workout ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map