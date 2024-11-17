"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThought = exports.updateThought = exports.removeReaction = exports.addReaction = exports.createThought = exports.getThoughtById = exports.getAllThoughts = exports.headCount = void 0;
const index_js_1 = require("../models/index.js");
const express_1 = require("express");
const router = (0, express_1.Router)();
//Aggregate function to get number of all thoughts
const headCount = async () => {
    const numberOfThoughts = await index_js_1.Thought.aggregate()
        .count('reactionCount');
    return numberOfThoughts;
};
exports.headCount = headCount;
//Get all thoughts
const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await index_js_1.Thought.find();
        const thoughtObj = {
            thoughts,
            headCount: await (0, exports.headCount)(),
        };
        res.json(thoughtObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getAllThoughts = getAllThoughts;
//Get thought by id
const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await index_js_1.Thought.findById(thoughtId)
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
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getThoughtById = getThoughtById;
//Create a thought
const createThought = async (req, res) => {
    try {
        // First check if user exists
        const user = await index_js_1.User.findOne({ username: req.body.username });
        if (!user) {
            res.status(404).json({ message: 'No user found with this username!' });
            return;
        }
        // If user exists, create thought
        const thought = await index_js_1.Thought.create({
            thouhtText: req.body.thouhtText,
            username: req.body.username
        });
        // Update user's thoughts array
        await index_js_1.User.findOneAndUpdate({ _id: user._id }, { $push: { thoughts: thought._id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this username!' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.createThought = createThought;
// Add a reaction to a thought
const addReaction = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const thought = await index_js_1.Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.addReaction = addReaction;
// Remove a reaction from a thought
const removeReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await index_js_1.Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.removeReaction = removeReaction;
// Update a thought
const updateThought = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const thought = await index_js_1.Thought.findByIdAndUpdate(thoughtId, req.body, {
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
exports.updateThought = updateThought;
// Delete a thought
const deleteThought = async (req, res) => {
    try {
        const thought = await index_js_1.Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found with this id!' });
        }
        res.json({ message: 'Thought deleted successfully!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.deleteThought = deleteThought;
exports.default = router;
