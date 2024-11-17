"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Reaction_js_1 = require("./Reaction.js");
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction_js_1.reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
//Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
