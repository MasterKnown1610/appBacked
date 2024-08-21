import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*'
  }))
app.use(express.json());

// Connect to MongoDB
// connectDB();

// Define routes
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/auth', authRoutes);



app.use((req, res) => {
    res.status(404).send('Not Found');
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

export default app;
