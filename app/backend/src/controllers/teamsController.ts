import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  public retrieveAllTeams = async (_req: Request, res: Response) => {
    const teams = await new TeamsService().getTeams();
    return res.status(200).json(teams);
  };

  public retrieveTeamById = async (req: Request, res: Response) => {
    const team = await new TeamsService().getTeamById(Number(req.params.id));
    return res.status(200).json(team);
  };
}

export default TeamsController;
