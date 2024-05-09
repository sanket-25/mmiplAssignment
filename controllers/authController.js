// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'sanket12345';

exports.register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (User.findByUsername(username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    User.createUser(username, password);
    res.status(201).json({ message: 'User created successfully' });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = User.findByUsernameAndPassword(username, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};

// controllers/postController.js
// You can similarly implement controllers for handling blog post operations
