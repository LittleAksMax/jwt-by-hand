import JwtToken from '../../jwt/token';
import TokenFactory from '../../jwt/tokenFactory';
import TokenVerifier from '../../jwt/tokenVerifier';
import IdentityService from './identityService';
import { User } from './models';
import UserService from './userService';

class IdentityController {
  private _idService: IdentityService;
  private _userService: UserService;

  constructor(idService: IdentityService, userService: UserService) {
    this._idService = idService;
    this._userService = userService;
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

  signIn = (email: string, password: string): JwtToken | null => {
    const existingUser: User | null = this._userService.getUser(
      email,
      password
    );

    if (existingUser === null) {
      return null; // user doesn't exist, therefore can't sign in
    }

    const token = this._idService.signToken(existingUser);
    return token;
  };
}

export default IdentityController;
