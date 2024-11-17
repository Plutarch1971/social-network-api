"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = exports.headCount = void 0;
const index_js_1 = require("../models/index.js");
// Aggregate function to get number of all users
const headCount = async () => {
    const numberOfFriends = await index_js_1.User.aggregate()
        .count('friendCount');
    return numberOfFriends;
};
exports.headCount = headCount;
// 
const getAllUsers = async (_req, res) => {
    try {
        const users = await index_js_1.User.find();
        const userObj = {
            users,
            headCount: await (0, exports.headCount)(),
        };
        res.json(userObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await index_js_1.User.findById(userId)
            .populate('thought')
            .populate('friends');
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: 'No user found with this id!'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const user = await index_js_1.User.create(req.body);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await index_js_1.User.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: 'No user found with this id!'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await index_js_1.User.findByIdAndDelete(userId);
        if (user) {
            res.json({
                message: 'User deleted!'
            });
        }
        else {
            res.status(404).json({
                message: 'No user found with this id!'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.deleteUser = deleteUser;
