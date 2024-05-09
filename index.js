const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'sanket12345';

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

app.use(bodyParser.json());
app.use(cors());

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = { id: users.length + 1, username: username, password: password };
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route!' });
});




app.get('/posts', (req, res) => {
});

app.get('/posts/:id', (req, res) => {
});

app.post('/posts', (req, res) => {
});

app.put('/posts/:id', (req, res) => {
});

app.delete('/posts/:id', (req, res) => {
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
