import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

// GET /api/leaderboard - Get leaderboard rankings
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('userId')
      .populate('teamId');
    res.json({ message: 'Get leaderboard', data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/team/:teamId - Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId })
      .sort({ rank: 1 })
      .populate('userId');
    res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET /api/leaderboard/user/:userId - Get user rank
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userRank = await Leaderboard.findOne({ userId }).populate('userId').populate('teamId');
    if (!userRank) {
      return res.status(404).json({ error: 'User rank not found' });
    }
    res.json({ message: `Get rank for user ${userId}`, data: userRank });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rank' });
  }
});

export default router;
