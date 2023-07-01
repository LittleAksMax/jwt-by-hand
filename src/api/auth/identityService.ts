import TokenFactory from '../../jwt/tokenFactory';
import JwtToken from '../../jwt/token';
import { Header, Payload } from '../../types/token';
import { v4 as uuidv4 } from 'uuid';
import { User } from './models';
import TokenVerifier from '../../jwt/tokenVerifier';

class IdentityService {
  private _tokFactory: TokenFactory;
  private _tokVerifier: TokenVerifier;

  // secret is at least as long as algorithm -- e.g., HMACSHA256 requires
  // 256-bit key AT LEAST
  // store this securely somewhere, don't use a weak one like below
  // I pulled this from some random generator website
  private _secretKey: string = 'U1bCHsMZfSSwzplfaIMVaHmZG3BmLafc';

  constructor(tokFactory: TokenFactory, tokVerifier: TokenVerifier) {
    this._tokFactory = tokFactory;
    this._tokVerifier = tokVerifier;
  }

  public verifyToken = (jwtToken: JwtToken): boolean => {
    const header: string = jwtToken.header;
    const payload: string = jwtToken.payload;
    const signature: string = jwtToken.signature;

    const verified: boolean = this._tokVerifier.verify(
      header,
      payload,
      signature,
      this._secretKey
    );

    return verified;
  };

  public verifyRole = (jwtToken: JwtToken, role: string): boolean => {
    const payload: string = jwtToken.payload;

    return this._tokVerifier.verifyRole(payload, role);
  };

  public signToken = (user: User): JwtToken => {
    const header: Header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const payload: Payload = {
      sub: user.id,
      iss: 'issuer',
      exp: 5, // usually 1200 for 20 mins
      iat: Math.floor(Date.now() / 1000), // / 1000 to get millisec -> sec
      aud: 'audience',
      jti: uuidv4(),

      // other flags of my own for user claims
      eml: user.email,
      roles: [],
    };

    if (user.admin) {
      payload.roles.push('Admin');
    }

    return this._tokFactory.create(header, payload, this._secretKey);
  };
}

export default IdentityService;
