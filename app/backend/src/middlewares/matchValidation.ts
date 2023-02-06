import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamsService';

function validateEqualTeams(req: Request, res: Response, next: NextFunction) {
  const errorMessage = { message: 'It is not possible to create a match with two equal teams' };
  if (req.body.homeTeamId === req.body.awayTeamId) return res.status(422).json(errorMessage);
  next();
}

async function validateAbsentTeam(req: Request, res: Response, next: NextFunction) {
  const service = new TeamsService();
  const homeTeam = await service.getTeamById(req.body.homeTeamId);
  const awayTeam = await service.getTeamById(req.body.awayTeamId);
  const notFoundMessage = { message: 'There is no team with such id!' };
  if (!homeTeam || !awayTeam) return res.status(404).json(notFoundMessage);
  next();
}

export default { validateEqualTeams, validateAbsentTeam };
