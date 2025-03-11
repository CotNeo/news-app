require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { newsRoutes } = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/news-app';

// Middleware
app.use(cors({
  origin: '*', // Tüm kaynaklardan gelen isteklere izin ver (production'da daha spesifik olmalı)
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json());

// Routes
app.use('/api', newsRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send("🚀 Render'da Çalışan News App Backend");
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Bağlandı");
    // Start server after successful database connection
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Bağlantı Hatası:", err);
  });

module.exports = app; 