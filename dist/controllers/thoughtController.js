import { Thought, User } from '../models/index.js';
import { Router } from 'express';
const router = Router();
//Aggregate function to get number of all thoughts
export const headCount = async () => {
    const numberOfThoughts = await Thought.aggregate()
        .count('reactionCount');
    return numberOfThoughts;
};
//Get all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        const thoughtObj = {
            thoughts,
            headCount: await headCount(),
        };
        res.json(thoughtObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//Get thought by id
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    console.log('Requested thought ID:', thoughtId);
    try {
        const thought = await Thought.findById(thoughtId)
            .populate('reactions');
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'No thought found with this id!'
            });
        }
    }
    catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};
//Create a thought
export const createThought = async (req, res) => {
    try {
        // Get user by id instead of username
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        // Create thought using user's username
        const thought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: user.username // Use user's username from the found user
        });
        // Update user's thoughts array
        await User.findByIdAndUpdate(user._id, { $push: { thoughts: thought._id } }, { new: true });
        res.status(201).json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// Add a reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        console.log(thoughtId);
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Remove a reaction from a thought
export const removeReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Update a thought
export const updateThought = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, {
            new: true,
            runValidators: true,
        });
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'No thought found with this id!'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//Delete a thought
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found with this id!' });
        }
        res.json({ message: 'Thought deleted successfully!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// export const removeThought = async (req: Request, res: Response) => {
//     try {
//         const user = await User.findById(req.params.userId);
//         const thought = await Thought.findById(req.params.thoughtId);
//         if (user && thought) {
//             user.thoughts.filter(thoughtsToKeep => thoughtsToKeep._id as Types.ObjectId !== thought._id as Types.ObjectId)
//             if (user) {
//                 await user.save();
//                 res.json(user);
//                 console.log(`User's thought: ${thought} successfully deleted for ${user}`);
//             }
//         } else {
//             res.status(404).json({
//                 message: 'No user found with this id!'
//             });
//         }
//         }catch (error: any) {
//             res.status(500).json({
//                 message: error.message
//             });
//         }
//     }
export default router;
