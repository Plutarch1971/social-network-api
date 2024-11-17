"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const User_1 = require("../models/User");
const data_1 = require("./data");
// import { reactions } from '../seed/data';
const cleanDB_1 = __importDefault(require("../seed/cleanDB"));
const seedDatabase = async () => {
    try {
        // Clean existing data
        await (0, cleanDB_1.default)();
        // Seed users first
        const createdUsers = await User_1.User.create(data_1.users);
        console.log('Users seeded!');
        // Add friends
        const user1 = createdUsers[0];
        const user2 = createdUsers[1];
        const user3 = createdUsers[2];
        // Now TypeScript knows these are ObjectIds
        user1.friends.push(user2._id);
        user1.friends.push(user3._id);
        user2.friends.push(user1._id);
        user2.friends.push(user3._id);
        user3.friends.push(user1._id);
        user3.friends.push(user2._id);
        await Promise.all([
            user1.save(),
            user2.save(),
            user3.save()
        ]);
        console.log('Friend relationships seeded!');
        // Create thoughts and associate them with users
        const thoughtsWithUsers = data_1.thoughts.map(thought => ({
            ...thought,
            reactions: data_1.reactions.filter(reaction => reaction.username !== thought.username)
        }));
        const createdThoughts = await models_1.Thought.create(thoughtsWithUsers);
        console.log('Thoughts and reactions seeded!');
        // Update users with their thoughts
        for (const thought of createdThoughts) {
            const user = await User_1.User.findOne({ username: thought.username });
            if (user) {
                user.thoughts.push(thought._id);
                await user.save();
            }
        }
        console.log('User thoughts updated!');
        console.log('All seed data inserted successfully!');
        process.exit(0);
    }
    catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};
exports.default = seedDatabase;
