import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import Users from '../database/models/UserModel';

class UserService {
  public getUser = async (email: string, password: string): Promise<IUser | undefined> => {
    const result = await Users.findOne({ where: { email }, raw: true }) as IUser;
    if (result && bcrypt.compareSync(password, result.password)) return result;
  };
}

export default UserService;
