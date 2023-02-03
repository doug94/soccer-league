import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchesController {
  public retrieveAllMatches = async (req: Request, res: Response) => {
    const matches = await new MatchService().getAllMatches();
    return res.status(200).json(matches);
  };
}

export default MatchesController;
