const User = require('../models/User');

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(users);
        }
    });
};