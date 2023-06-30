import { Decoder } from '../../jwt/coders';
import JwtToken from '../../jwt/token';
import TokenFactory from '../../jwt/tokenFactory';
import TokenVerifier from '../../jwt/tokenVerifier';
import IdentityService from '../auth/identityService';
import { Data } from './models';
import productData from './productDatabase';

class DataController {
  private _idService: IdentityService;

  constructor(
    tokFactory: TokenFactory,
    tokVerifier: TokenVerifier,
    decoder: Decoder
  ) {
    this._idService = new IdentityService(tokFactory, tokVerifier, decoder);
  }

  // this is meant to simulate an endpoint requiring authorization
  public getData = (jwtToken: JwtToken): Data[] | null => {
    if (!this._idService.verifyToken(jwtToken)) {
      return null;
    }

    // return copy of the data
    return productData.copyWithin(0, productData.length);
  };
}

export default DataController;
