import { Encoder } from './coders';
import { IHashHandler } from './hashHandlers';
import HashMediator from './hashMediator';

class TokenVerifier {
  private _encoder: Encoder;
  private _mediator: HashMediator;

  constructor(encoder: Encoder) {
    this._encoder = encoder;
    this._mediator = new HashMediator();
  }

  /**
   *
   * @param header The header part of the JWT
   * @param payload The payload part of the JWT
   * @param signatureToCompareTo The signature part of the JWT
   * @param hashType The algorithm used to produce the signature (e.g., HS256)
   * @param secretKey The secret key the signature is hashed with
   * @param base64EncodeSecretKey Whether the secret key is also base64Url encoded
   *                              when forming the signature (default false)
   * @returns Whether the signature generated from header and payload match the
   *          signature given
   */
  public verify = (
    header: string,
    payload: string,
    signatureToCompareTo: string,
    hashType: string,
    secretKey: string,
    base64EncodeSecretKey: boolean = false
  ): boolean => {
    const toHash: string = `${header}.${payload}`;

    const hashHandler: IHashHandler | null =
      this._mediator.provideHandler(hashType);

    const generatedSignature: string = hashHandler.hash(
      toHash,
      base64EncodeSecretKey
        ? Buffer.from(secretKey, 'base64url')
        : Buffer.from(secretKey)
    );

    return signatureToCompareTo === generatedSignature;
  };
}

export default TokenVerifier;
