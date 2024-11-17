"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    thoughts: [
        {
            type: mongoose_2.default.Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
// Virtual to get friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Middlewares if needed
// userSchema.pre('remove', async function (next) {
//   // Could add middleware to remove associated thoughts when a user is deleted
//   next();
// });
const User = mongoose_2.default.model('User', userSchema);
exports.User = User;
