import { User } from '../models/index.js';
import { Types } from 'mongoose';
// Aggregate function to get number of all users
export const headCount = async () => {
    const numberOfFriends = await User.aggregate()
        .count('friendCount');
    return numberOfFriends;
    return;
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
    const { id } = req.params;
    console.log(id);
    try {
        const user = await User.findById(id)
            .populate({
            path: 'thought',
            strictPopulate: false
        })
            .populate({
            path: 'friends',
            strictPopulate: false
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
export const addFriend = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (user && friend) {
            user.friends.push(friend._id);
            friend.friends.push(user._id);
            await user.save();
            await friend.save();
        }
        else {
            res.status(404).json({
                message: 'No user found with this id!'
            });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteFriend = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (!Types.ObjectId.isValid(req.params.userId) || !Types.ObjectId.isValid(req.params.friendId)) {
            return res.status(400).json({ message: 'Invalid userId or friendId' });
        }
        if (user && friend) {
            user.friends.filter(friendsToKeep => friendsToKeep._id !== friend._id);
            await user.save();
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
export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
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
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
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
