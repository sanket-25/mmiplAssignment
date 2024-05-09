const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
// Import other route modules as needed

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Mounting routes
app.use('/auth', authRoutes);
// Mount other routes here

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
