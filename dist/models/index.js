"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionSchema = exports.Thought = exports.User = void 0;
const User_1 = require("../models/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Thought_1 = __importDefault(require("../models/Thought"));
exports.Thought = Thought_1.default;
const Reaction_1 = require("./Reaction");
Object.defineProperty(exports, "reactionSchema", { enumerable: true, get: function () { return Reaction_1.reactionSchema; } });
