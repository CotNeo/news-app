import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { newsRoutes } from './routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/news-app';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', newsRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Railway\'de Çalışan News App Backend');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log('✅ MongoDB Bağlandı');
    // Start server after successful database connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB Bağlantı Hatası:', error);
  });

export default app; 