"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /api/users - Get all users
router.get('/', (req, res) => {
    res.json({ message: 'Get all users', data: [] });
});
// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get user ${id}`, data: {} });
});
// POST /api/users - Create a new user
router.post('/', (req, res) => {
    res.status(201).json({ message: 'User created', data: req.body });
});
// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `User ${id} updated`, data: req.body });
});
// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `User ${id} deleted` });
});
exports.default = router;
//# sourceMappingURL=users.js.map