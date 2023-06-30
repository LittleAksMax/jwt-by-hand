import Encoder from '../jwt/encoder';
import TokenFactory from '../jwt/tokenFactory';
import JwtToken from '../jwt/token';
import { Header, Payload } from '../types/token';
import { v4 as uuidv4 } from 'uuid';
import { User } from './models';

class IdentityService {
  private _tokFactory: TokenFactory;

  // secret is at least as long as algorithm -- e.g., HMACSHA256 requires
  // 256-bit key AT LEAST
  // store this securely somewhere, don't use a weak one like below
  // I pulled this from some random generator website
  private _secretKey: string = 'U1bCHsMZfSSwzplfaIMVaHmZG3BmLafc';

  constructor() {
    this._tokFactory = new TokenFactory(new Encoder());
  }

  public verifyToken = (email: string, password: string): JwtToken | null => {
    return null;
  };

  public signToken = (user: User): JwtToken => {
    const header: Header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const payload: Payload = {
      sub: user.id,
      iss: 'issuer',
      exp: 1200,
      iat: Date.now() / 1000, // /1000 to get millisec -> sec
      aud: 'audience',
      jti: uuidv4(),

      // other flags of my own for user claims
      eml: user.email,
    };

    return this._tokFactory.create(header, payload, this._secretKey);
  };
}

export default IdentityService;
