import { User } from '../models/index.js';
// Aggregate function to get number of all users
export const headCount = async () => {
    const numberOfFriends = await User.aggregate()
        .count('friendCount');
    return numberOfFriends;
};
// 
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        const userObj = {
            users,
            headCount: await headCount(),
        };
        res.json(userObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
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
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(req.body.id, req.body, {
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
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
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
