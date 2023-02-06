import { Request, Response, NextFunction } from 'express';

function validateMatch(req: Request, res: Response, next: NextFunction) {
  const errorMessage = { message: 'It is not possible to create a match with two equal teams' };
  if (req.body.homeTeamId === req.body.awayTeamId) return res.status(422).json(errorMessage);
  next();
}

export default validateMatch;
