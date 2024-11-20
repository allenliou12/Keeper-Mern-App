const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/keeper', require('./routes/notes'))

// Connect to MongoDB with better error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
  .then(() => {
    // Only start server after DB connection
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => {
      console.log('Connected to MongoDB & Server running on port', PORT)
    })
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error)
  })

// Handle DB connection events
mongoose.connection.on('error', err => {
  console.log('MongoDB error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})

