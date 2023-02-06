import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  public getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await new LeaderboardService().getStatsFromAllTeams();
    return res.status(200).json(leaderboard);
  };

  public getLeaderboardHomeTeams = async (_req: Request, res: Response) => {
    const leaderboard = await new LeaderboardService().getStatsFromAllTeams('home');
    return res.status(200).json(leaderboard);
  };

  public getLeaderboardAwayTeams = async (_req: Request, res: Response) => {
    const leaderboard = await new LeaderboardService().getStatsFromAllTeams('away');
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
