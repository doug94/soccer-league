import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/userService';

async function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.get('Authorization') as string;
    const secret = process.env.JWT_SECRET as string;
    const decodedEmail = jwt.verify(token, secret) as string;
    const user = await new UserService().getUserRole(decodedEmail);
    if (user) next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default validateToken;
