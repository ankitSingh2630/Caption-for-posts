const express = require('express');
const connectDB = require('./utils/connection');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const authRoutes = require('./routes/auth');
const postRoutes=require('./routes/posts')
connectDB();

const app = express();

app.use(express.json());    
app.use(cookieParser()); // Add this line to parse cookies

app.use('/api/auth', authRoutes);
app.use("/api/posts",postRoutes)

module.exports = app;