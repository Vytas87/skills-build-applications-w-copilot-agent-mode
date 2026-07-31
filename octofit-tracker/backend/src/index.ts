import 'dotenv/config';
import express from 'express';
import db from './config/database';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  const mongoReadyState = db.readyState;
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port: PORT,
    mongo: {
      host: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
      readyState: mongoReadyState,
    },
  });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on http://localhost:${PORT}`);
});
