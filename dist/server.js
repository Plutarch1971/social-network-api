"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./config/connection"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(api_1.default);
connection_1.default.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
