import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  public leaderboardService: LeaderboardService;

  public constructor(leaderboardService: LeaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  public getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getStatsFromAllTeams();
    return res.status(200).json(leaderboard);
  };

  public getLeaderboardHomeTeams = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getStatsFromAllTeams('home');
    return res.status(200).json(leaderboard);
  };

  public getLeaderboardAwayTeams = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getStatsFromAllTeams('away');
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
