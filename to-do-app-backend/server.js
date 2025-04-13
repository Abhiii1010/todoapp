require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todos');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
