const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, world!');
});

router.get('/hi', (req, res) => {
    res.json({ "hi": "hello" });
});


module.exports = router;