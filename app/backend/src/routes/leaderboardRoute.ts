import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/', leaderboardController.getLeaderboard);

router.get('/home', leaderboardController.getLeaderboardHomeTeams);

router.get('/away', leaderboardController.getLeaderboardAwayTeams);

export default router;
