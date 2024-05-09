// const express = require('express');
// const mongoose = require('mongoose');
// const routes = require('./routes/routes');

// const app = express();
// const port = process.env.PORT || 3000;

// // const mongoURI = 'mongodb+srv://2022sanketdhuri:WKm6WEKmHe80Mgql@cluster0.91iy5uo.mongodb.net/iot';

// // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => console.log('MongoDB connected'))
// //     .catch(err => console.log(err));

// app.use('/', routes);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sanket25!',
  database: 'temp'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Create a record
app.post('/api/records', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO records (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    res.send('Record added...');
  });
});

// Read all records
app.get('/api/records', (req, res) => {
  const sql = 'SELECT * FROM records';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Read a record
app.get('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM records WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Update a record
app.put('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = 'UPDATE records SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, id], (err, result) => {
    if (err) throw err;
    res.send('Record updated...');
  });
});

// Delete a record
app.delete('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM records WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send('Record deleted...');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
