"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const sqlite3_1 = require("sqlite3");
const connection = new sqlite3_1.Database('./data.db');
// Create tasks table if not exists
connection.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskName TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
exports.default = connection;
