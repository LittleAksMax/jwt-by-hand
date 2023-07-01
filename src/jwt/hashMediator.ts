import { HS256Handler, IHashHandler } from './hashHandlers';

/**
 * Mediator class to provide the handlers to hash for each
 * type of algorithm. For now only the HS256 algorithm is supported,
 * but I used this mediator pattern to make the implementation of other
 * algorithms much easier.
 */
class HashMediator {
  private _hs256Handler: HS256Handler;

  constructor(hs256Handler: HS256Handler) {
    this._hs256Handler = hs256Handler;
  }

  provideHandler = (hashType: string): IHashHandler => {
    switch (hashType) {
      // add other cases for other algorithms, each with their own
      // handler instance
      case 'HS256':
        return this._hs256Handler;
      default:
        throw new Error('Unknown hash type: ' + hashType);
    }
  };
}

export default HashMediator;
