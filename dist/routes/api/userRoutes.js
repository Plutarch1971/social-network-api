"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../../models/User");
const userController_js_1 = require("../../controllers/userController.js");
const router = (0, express_1.Router)();
// /api/users
router.get('/', userController_js_1.getAllUsers);
// /api/users/:userId
router.get('/:id', userController_js_1.getUserById);
// /api/users
router.post('/', userController_js_1.createUser);
// /api/users/:userId
router.put('/:id', userController_js_1.updateUser);
// /api/users/:userId
router.delete('/:id', userController_js_1.deleteUser);
//Get all users
router.get('/', async (_req, res) => {
    try {
        const users = await User_1.User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
