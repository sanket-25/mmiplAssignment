const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    User.createUser(username, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
};
