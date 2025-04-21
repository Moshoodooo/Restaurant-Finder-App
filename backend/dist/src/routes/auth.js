"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const hash_1 = require("../utils/hash");
const router = express_1.default.Router();
const JWT_SECRET = 'your-secret-key'; // Ideally use process.env.JWT_SECRET
// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashed = await (0, hash_1.hashPassword)(password);
        await db_1.pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashed]);
        res.send({ success: true });
    }
    catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});
// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = result.rows[0];
        const match = await (0, hash_1.comparePassword)(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token });
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.default = router;
