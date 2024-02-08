"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Root path handler
app.get('/', (req, res) => {
    res.send('Hello, Node.js Express Server!');
});
// Use the tasksRouter for all routes starting with /tasks
app.use('/tasks', tasks_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
