import { Router } from 'express';
import Workout from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const suggestions = await Workout.find().sort({ isTemplate: -1, createdAt: -1 }).lean();
    res.json({
      resource: 'workouts',
      count: suggestions.length,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default workoutsRouter;