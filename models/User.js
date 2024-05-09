// models/User.js
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

module.exports = {
    findByUsernameAndPassword: (username, password) => {
        return users.find(u => u.username === username && u.password === password);
    },
    findByUsername: (username) => {
        return users.find(u => u.username === username);
    },
    createUser: (username, password) => {
        const newUser = { id: users.length + 1, username, password };
        users.push(newUser);
        return newUser;
    }
};
