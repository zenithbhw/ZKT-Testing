
/**
 * CLOUD ATTENDANCE BACKEND (Reference Implementation)
 * Dependencies: express, mysql2, jsonwebtoken, bcryptjs, cors, zkteco-js
 */

const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const ZKLib = require('zkteco-js');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_super_secret_key';

// Database Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cloud_attendance',
    waitForConnections: true,
    connectionLimit: 10
});

// Middlewares
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.user = decoded;
        next();
    });
};

const checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
};

// --- API ENDPOINTS ---

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: 'User not found' });
        
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        if (user.status !== 'approved') return res.status(401).json({ message: 'Account pending approval' });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ id: user.id, name: user.name, role: user.role, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dealers (SuperAdmin only)
app.get('/api/dealers', verifyToken, checkRole('superadmin'), async (req, res) => {
    const [dealers] = await pool.execute('SELECT id, name, email, status, created_at FROM users WHERE role = "dealer"');
    res.json(dealers);
});

// Update Dealer Status
app.put('/api/dealers/:id/status', verifyToken, checkRole('superadmin'), async (req, res) => {
    const { status } = req.body;
    await pool.execute('UPDATE users SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
});

// Stats
app.get('/api/stats', verifyToken, async (req, res) => {
    const [dealers] = await pool.execute('SELECT count(*) as count FROM users WHERE role = "dealer"');
    const [offices] = await pool.execute('SELECT count(*) as count FROM users WHERE role = "office_admin"');
    const [devices] = await pool.execute('SELECT count(*) as count FROM devices');
    res.json({
        totalDealers: dealers[0].count,
        totalOffices: offices[0].count,
        activeDevices: devices[0].count,
        pendingRequests: 0 // Mocked
    });
});

// --- ZKTECO INTEGRATION UTILITY ---
const syncDevice = async (device) => {
    const zk = new ZKLib(device.ip_address, device.port, 10000, 4000);
    try {
        await zk.createSocket();
        const logs = await zk.getAttendance();
        // Processing logs...
        // Insert logs into attendance table
        for (const log of logs.data) {
            await pool.execute(
                'INSERT IGNORE INTO attendance (user_id, timestamp, device_id) VALUES (?, ?, ?)',
                [log.deviceUserId, log.recordTime, device.id]
            );
        }
        await zk.disconnect();
    } catch (e) {
        console.error('Failed to sync device:', device.serial_number);
    }
};

app.listen(8081, () => console.log('Server running on port 8081'));
