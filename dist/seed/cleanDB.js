"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const cleanDB = async () => {
    try {
        // Delete all users
        const deletedUsers = await index_1.User.deleteMany({});
        console.log(`User collection cleaned: ${deletedUsers.deletedCount} documents removed.`);
        // Delete all thoughts (reactions will be automatically deleted as they are subdocuments)
        const deletedThoughts = await index_1.Thought.deleteMany({});
        console.log(`Thought collection cleaned: ${deletedThoughts.deletedCount} documents removed.`);
        console.log('Database cleaned successfully.');
    }
    catch (err) {
        console.error('Error cleaning database:', err);
        throw err; // Let the calling function handle the error
    }
};
exports.default = cleanDB;
