import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  private teamsService: TeamsService;

  public constructor() {
    this.teamsService = new TeamsService();
  }

  public retrieveAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.getTeams();
    return res.status(200).json(teams);
  };

  public retrieveTeamById = async (req: Request, res: Response) => {
    const team = await this.teamsService.getTeamById(Number(req.params.id));
    return res.status(200).json(team);
  };
}

export default TeamsController;
