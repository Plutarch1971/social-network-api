"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionSchema = void 0;
const mongoose_1 = require("mongoose");
const reactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        getters: true,
        transform: (doc, ret) => {
            ret.createdAt = ret.createdAt.toISOString();
            return ret;
        }
    },
    id: false,
});
exports.reactionSchema = reactionSchema;
