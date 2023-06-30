import IdentityController from './api/auth/identityController';
import DataController from './api/data/dataController';
import { Decoder, Encoder } from './jwt/coders';
import JwtToken from './jwt/token';
import TokenFactory from './jwt/tokenFactory';
import TokenVerifier from './jwt/tokenVerifier';

// my bad simple version of dependency injection (I'm lazy)
const encoder: Encoder = new Encoder();
const decoder: Decoder = new Decoder();
const tokFactory: TokenFactory = new TokenFactory(encoder);
const tokVerifier: TokenVerifier = new TokenVerifier(encoder);
const idController: IdentityController = new IdentityController(
  tokFactory,
  tokVerifier,
  decoder
);
const dataController: DataController = new DataController(
  tokFactory,
  tokVerifier,
  decoder
);

const printOrNullError = (jwtToken: JwtToken | null): void => {
  if (jwtToken === null) {
    console.log('Null token. Error in registration');
  } else {
    console.log(jwtToken.toString());
  }
};

const jwtToken: JwtToken | null = idController.register(
  'test.email@testemail.com',
  'StrongPassword123!'
);

// prints out token
printOrNullError(jwtToken);

// re-registering with same credentials
const jwtToken2: JwtToken | null = idController.register(
  'test.email@testemail.com',
  'StrongPassword123!'
);

// prints out null token error.
printOrNullError(jwtToken2);

const jwtTokenSignIn: JwtToken | null = idController.signIn(
  'test.email@testemail.com',
  'StrongPassword123!'
);

// prints out token with different signature to original
// as new token assigned
printOrNullError(jwtTokenSignIn);

// ! since jwtToken can't be null
console.log(dataController.getData(jwtToken!));
