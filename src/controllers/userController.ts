import { Request, Response } from 'express';
import { User } from '../models/index.js';
import { Types } from 'mongoose';

// Aggregate function to get number of all users
export const headCount = async () => {
    const numberOfFriends = await User.aggregate()
        .count('friendCount');
    return numberOfFriends;
}

// 
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const userObj = {
            users,
            headCount: await headCount(),
        }

        res.json(userObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
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
        } else {
            res.status(404).json({
                 message: 'No user found with this id!' 
                });
        } 
    } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    };

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (user && friend) {
            user.friends.push(friend._id as Types.ObjectId);
            friend.friends.push(user._id as Types.ObjectId);
            await user.save();
            await friend.save();
        } else {
            res.status(404).json({
                message: 'No user found with this id!'
            });
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (user && friend) {
            user.friends.filter(friendsToKeep => friendsToKeep._id as Types.ObjectId !== friend._id as Types.ObjectId)
           
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({
                message: 'No user found with this id!'
            });
        }
        
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'No user found with this id!'
            });
        } 
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    };
     export const deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            if (user) {
                res.json({
                    message: 'User deleted!'
                });
            } else {
                res.status(404).json({
                    message: 'No user found with this id!'
                });
            }
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
     };