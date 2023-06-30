import JwtToken from '../jwt/token';
import IdentityService from './identityService';
import { User } from './models';
import UserService from './userService';

class IdentityController {
  private _idService: IdentityService;
  private _userService: UserService;

  constructor() {
    this._idService = new IdentityService();
    this._userService = new UserService();
  }

  register = (email: string, password: string): JwtToken | null => {
    const createdUser: User | null = this._userService.createUser(
      email,
      password
    );

    if (createdUser === null) {
      return null; // there was an error
    }

    const token: JwtToken = this._idService.signToken(createdUser);

    return token;
  };

  signIn = (email: string, password: string, jwtToken: JwtToken) => {
    throw new Error('Not implemented');
  };

  refresh = () => {
    throw new Error('Not implemented');
  };
}

export default IdentityController;
