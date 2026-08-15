"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /api/workouts - Get all workouts
router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts', data: [] });
});
// GET /api/workouts/:id - Get workout by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get workout ${id}`, data: {} });
});
// POST /api/workouts - Create a new workout suggestion
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Workout suggestion created', data: req.body });
});
// PUT /api/workouts/:id - Update workout
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Workout ${id} updated`, data: req.body });
});
// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Workout ${id} deleted` });
});
exports.default = router;
//# sourceMappingURL=workouts.js.map