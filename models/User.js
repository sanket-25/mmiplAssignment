const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

const db = require('../db');

module.exports = {
    getAllUsers: (callback) => {
        db.query('SELECT * FROM users', callback);
    },
    getUserById: (id, callback) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], callback);
    },
    createUser: (username, password, callback) => {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], callback);
    },
};
