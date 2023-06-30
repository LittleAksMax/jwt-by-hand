import Encoder from './jwt/encoder';
import TokenFactory from './jwt/tokenFactory';
import { Header, Payload } from './types/token';

const encoder: Encoder = new Encoder();
const factory: TokenFactory = new TokenFactory(encoder);

const header: Header = {
  alg: 'HS256',
  typ: 'JWT',
};

const payload: Payload = {
  sub: 'da169f91-be98-4185-a6f9-be0067faf29d', // random GUID
  iss: 'issuer',
  exp: 1200,
  iat: 1688079349,
  aud: 'audience',
  jti: 'e03658a9-6c27-4379-8eee-8da8fd2250f2', // random GUID
};

// must be 256-bit
// keep this secret
// I pulled this from some random generator website
const secretKey: string = 'U1bCHsMZfSSwzplfaIMVaHmZG3BmLafc';

console.log(factory.create(header, payload, secretKey).toString());
