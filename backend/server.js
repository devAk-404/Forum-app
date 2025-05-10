require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./config/dbConnection');  // Import the initialized Prisma client
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comments');
const morgan = require("morgan");

const app = express();
app.use(morgan('dev')); 
app.use(cors());
app.use(express.json());

// Test connection at the start
async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);  // Exit process if connection fails
  }
}

connectDatabase();  // Call this to initiate connection

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/:blogId/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
