import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/userService';

class UserController {
  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const dbQuery = await new UserService().getUser(email, password);
      if (dbQuery) {
        const secret = process.env.JWT_SECRET as string;
        const token = jwt.sign(email, secret);
        return res.status(200).json({ token });
      }
      return res.status(401).json({ message: 'Incorrect email or password' });
    } catch (error) {
      console.error(error);
    }
  };

  public validateRole = async (req: Request, res: Response) => {
    try {
      const token = req.get('Authorization') as string;
      const secret = process.env.JWT_SECRET as string;
      const decodedEmail = jwt.verify(token, secret) as string;
      const role = await new UserService().getUserRole(decodedEmail);
      if (role) return res.status(200).json({ role });
    } catch (error) {
      console.error(error);
    }
  };
}

export default UserController;
