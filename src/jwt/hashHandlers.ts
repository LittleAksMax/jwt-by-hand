/**
 * This file contains all of the hash handlers for all the
 * algorithms implemented. For now it is only the HS256 algorithm
 * handler.
 */

import { createHmac } from 'crypto';

/**
 * All future hash handlers should implement this interface.
 */
export interface IHashHandler {
  hash: (signature: string, keyBuffer: Buffer) => string;
}

export class HS256Handler implements IHashHandler {
  hash = (toHash: string, keyBuffer: Buffer): string => {
    const hashed: string = createHmac('SHA256', keyBuffer)
      .update(toHash)
      .digest('base64url');
    return hashed;
  };
}
