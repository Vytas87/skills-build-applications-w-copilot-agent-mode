import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const rankings = await Leaderboard.find().populate('entries.user', 'name').lean();

    res.json({
      resource: 'leaderboard',
      count: rankings.length,
      rankings,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default leaderboardRouter;