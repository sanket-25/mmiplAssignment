const { validationResult } = require('express-validator');

exports.validateRegisterInput = (req, res, next) => {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({ errors: errors.map(error => error.msg) });
    }
    next();
};
