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
}

export default MatchesController;