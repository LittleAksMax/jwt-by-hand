import { Header, Payload } from '../types/token';
import { IHashHandler } from './hashHandlers';
import Encoder from './encoder';
import HashMediator from './hashMediator';
import JwtToken from './token';

export interface ITokenFactory {
  create: (
    header: Header,
    payload: Payload,
    secretKey: string,
    base64urlEncodeSecretKey: boolean
  ) => JwtToken;
}

class TokenFactory implements ITokenFactory {
  private _encoder: Encoder;
  private _mediator: HashMediator;

  constructor(encoder: Encoder) {
    this._encoder = encoder;
    this._mediator = new HashMediator();
  }

  create = (
    header: Header,
    payload: Payload,
    secretKey: string,
    base64EncodeSecretKey: boolean = true
  ): JwtToken => {
    const sHeader: string = JSON.stringify(header);
    const encodedHeader: string = this._encoder.base64UrlEncode(sHeader);
    const sPayload: string = JSON.stringify(payload);
    const encodedPayload: string = this._encoder.base64UrlEncode(sPayload);

    // find hash handler based on algorithm specified in header.
    const hashHandler: IHashHandler | null = this._mediator.provideHandler(
      header.alg
    );

    if (hashHandler === null) {
      throw new Error('Invalid hash algorithm type provided');
    }

    const signature = hashHandler.hash(
      `${encodedHeader}.${encodedPayload}`,
      base64EncodeSecretKey
        ? Buffer.from(secretKey, 'base64url')
        : Buffer.from(secretKey)
    );

    return new JwtToken(encodedHeader, encodedPayload, signature);
  };
}

export default TokenFactory;
