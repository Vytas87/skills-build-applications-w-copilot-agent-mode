import { Router } from 'express';
import Activity from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ performedAt: -1 })
      .populate('user', 'name email')
      .populate('team', 'name')
      .lean();

    res.json({
      resource: 'activities',
      count: activities.length,
      items: activities,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default activitiesRouter;