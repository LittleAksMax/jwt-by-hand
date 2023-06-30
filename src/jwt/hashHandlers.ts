import { createHmac } from 'crypto';

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
