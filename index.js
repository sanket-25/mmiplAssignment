const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

// const mongoURI = 'mongodb+srv://2022sanketdhuri:WKm6WEKmHe80Mgql@cluster0.91iy5uo.mongodb.net/iot';

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});