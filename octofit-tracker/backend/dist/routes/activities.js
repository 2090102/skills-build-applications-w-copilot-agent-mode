"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /api/activities - Get all activities
router.get('/', (req, res) => {
    res.json({ message: 'Get all activities', data: [] });
});
// GET /api/activities/:id - Get activity by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get activity ${id}`, data: {} });
});
// POST /api/activities - Log a new activity
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Activity logged', data: req.body });
});
// PUT /api/activities/:id - Update activity
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Activity ${id} updated`, data: req.body });
});
// DELETE /api/activities/:id - Delete activity
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Activity ${id} deleted` });
});
exports.default = router;
//# sourceMappingURL=activities.js.map