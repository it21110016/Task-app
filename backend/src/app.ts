import express from 'express';
import taskRoutes from './routes/task.routes';
import { sequelize } from './db';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);

// health check
app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'OK' });
});

export { app, sequelize };
