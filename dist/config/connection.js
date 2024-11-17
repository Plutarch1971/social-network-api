"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = 'mongodb://127.0.0.1:27017/socialNetworkDB';
mongoose_1.default.connect(connectionString, {
//useNewUrlParser: true,
//useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
exports.default = db;
