import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { getApiUrl, getApiConfig } from './config/api';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const PORT = 8000;

// MongoDB Connection URI
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Create Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  retryWrites: true,
  w: 'majority',
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'Server is running', 
    port: PORT,
    apiUrl: getApiUrl(),
    config: getApiConfig(),
  });
});

// Route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
export const startServer = () => {
  app.listen(PORT, () => {
    const apiUrl = getApiUrl();
    const config = getApiConfig();
    console.log(`\n🚀 OctoFit Tracker API Server`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Environment: ${config.environment}`);
    console.log(`API URL: ${apiUrl}`);
    console.log(`Port: ${PORT}`);
    if (config.isCodespaces) {
      console.log(`Codespace: ${config.codespaceName}`);
    }
    console.log(`MongoDB: ${MONGO_URI}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  });
};

export default app;
