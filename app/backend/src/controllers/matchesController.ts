import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';

class MatchesController {
  private matchService: MatchService;

  public constructor() {
    this.matchService = new MatchService();
  }

  public retrieveAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.inProgress === undefined) {
      const matches = await this.matchService.getAllMatches();
      return res.status(200).json(matches);
    }
    next();
  };

  public retrieveInProgressMatches = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.inProgress === 'true') {
      const matches = await this.matchService.getInProgressMatches();
      return res.status(200).json(matches);
    }
    next();
  };

  public retrieveFinishedMatches = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getFinishedMatches();
    return res.status(200).json(matches);
  };

  public saveMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const incomingMatch = { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals };
    const newMatch = await this.matchService.insertMatch(incomingMatch);
    return res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    await this.matchService.finishMatch(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  };

  public editMatch = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    await this.matchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Match edited successfully!' });
  };
}

export default MatchesController;
