import { Router } from 'express';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

const leaderboardService = new LeaderboardService();

const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/', leaderboardController.getLeaderboard);

router.get('/home', leaderboardController.getLeaderboardHomeTeams);

router.get('/away', leaderboardController.getLeaderboardAwayTeams);

export default router;
