// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sanket12345';

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
