import JwtToken from '../../jwt/token';
import IdentityService from '../auth/identityService';
import { Data } from './models';
import productData from './productDatabase';

class DataController {
  private _idService: IdentityService;

  constructor(idService: IdentityService) {
    this._idService = idService;
  }

  // this is meant to simulate an endpoint requiring authorization
  public getData = (jwtToken: JwtToken): Data[] | 'invalid' => {
    if (!this._idService.verifyToken(jwtToken)) {
      return 'invalid';
    }

    // return copy of the data
    return productData.copyWithin(0, productData.length);
  };

  /**
   * This endpoint requires the "Admin" role
   */
  public addData = (
    jwtToken: JwtToken,
    data: Data
  ): Data | 'invalid' | 'no clearance' => {
    if (!this._idService.verifyToken(jwtToken)) {
      return 'invalid';
    }

    if (!this._idService.verifyRole(jwtToken, 'Admin')) {
      return 'no clearance';
    }

    productData.push(data);
    return data;
  };
}

export default DataController;
