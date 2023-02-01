import { Request, Response, NextFunction } from 'express';

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const badRequestMessage = { message: 'All fields must be filled' };
  if (!req.body.email) return res.status(400).json(badRequestMessage);
  if (!req.body.password) return res.status(400).json(badRequestMessage);
  next();
}

export default validateLogin;
