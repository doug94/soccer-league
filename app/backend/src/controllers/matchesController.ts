import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';

class MatchesController {
  public retrieveAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.inProgress === undefined) {
      const matches = await new MatchService().getAllMatches();
      return res.status(200).json(matches);
    }
    next();
  };

  public retrieveInProgressMatches = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.inProgress === 'true') {
      const matches = await new MatchService().getInProgressMatches();
      return res.status(200).json(matches);
    }
    next();
  };

  public retrieveFinishedMatches = async (_req: Request, res: Response) => {
    const matches = await new MatchService().getFinishedMatches();
    return res.status(200).json(matches);
  };

  public saveMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const incomingMatch = { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals };
    const newMatch = await new MatchService().insertMatch(incomingMatch);
    return res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    await new MatchService().finishMatch(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  };

  public editMatch = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    await new MatchService().updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.sendStatus(200);
  };
}

export default MatchesController;
