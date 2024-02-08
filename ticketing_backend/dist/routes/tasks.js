"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/tasks.ts
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
// Create task
router.post('/', async (req, res) => {
    try {
        const { taskName } = req.body;
        db_1.default.run('INSERT INTO tasks (taskName) VALUES (?)', [taskName], function (err) {
            if (err) {
                console.error('Error creating task:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                res.json({ id: this.lastID }); // Access lastID using this
            }
        });
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Read all tasks
router.get('/', async (req, res) => {
    try {
        db_1.default.all('SELECT * FROM tasks', (err, tasks) => {
            if (err) {
                console.error('Error reading tasks:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                res.json(tasks);
            }
        });
    }
    catch (error) {
        console.error('Error reading tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
