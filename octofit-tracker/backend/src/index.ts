import 'dotenv/config';
import express from 'express';
import db from './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  const mongoReadyState = db.readyState;
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port: PORT,
    baseUrl,
    mongo: {
      host: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
      readyState: mongoReadyState,
    },
  });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on ${baseUrl}`);
});
