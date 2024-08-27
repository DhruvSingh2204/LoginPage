require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const authRoutes = require('./routes/auth')
const cors = require('cors');

app.use(cors());

app.use(express.json());

// connect database
connectDB();

app.use('/api/auth' , authRoutes)

mongoose.connection.once('open' , () => {
    console.log('Connected to MongoDB')
})

app.listen(PORT , () => console.log(`Server running on Port - ${PORT}`))