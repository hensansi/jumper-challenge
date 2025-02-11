// server.ts
import express, { Express } from 'express';
import { SqliteGuiNodeMiddleware } from 'sqlite-gui-node';
import sqlite3 from 'sqlite3';

// Initialize express app
const app: Express = express();

// Configure SQLite database with verbose mode
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./prisma/sqlite/dev.db');

// Use the SQLite GUI middleware
app.use(SqliteGuiNodeMiddleware(app, db));

// Start the server
app.listen(4000);
