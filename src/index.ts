import IdentityController from './api/auth/identityController';
import IdentityService from './api/auth/identityService';
import UserService from './api/auth/userService';
import DataController from './api/data/dataController';
import { Data } from './api/data/models';
import { Decoder, Encoder } from './jwt/coders';
import { HS256Handler } from './jwt/hashHandlers';
import HashMediator from './jwt/hashMediator';
import JwtToken from './jwt/token';
import TokenFactory from './jwt/tokenFactory';
import TokenVerifier from './jwt/tokenVerifier';

// my bad simple version of dependency injection (I'm lazy)
const encoder: Encoder = new Encoder();
const decoder: Decoder = new Decoder();
const hs256Handler: HS256Handler = new HS256Handler();
const mediator: HashMediator = new HashMediator(hs256Handler);

const tokFactory: TokenFactory = new TokenFactory(encoder, mediator);
const tokVerifier: TokenVerifier = new TokenVerifier(decoder, mediator);

const idService = new IdentityService(tokFactory, tokVerifier);
const userService = new UserService();

const idController: IdentityController = new IdentityController(
  idService,
  userService
);
const dataController: DataController = new DataController(idService);

// to easily print the result of authentication
const printOrNullError = (jwtToken: JwtToken | null): void => {
  if (jwtToken === null) {
    console.log('Null token. Error in registration');
  } else {
    console.log(jwtToken.toString());
  }
};

// so I can sleep the thread
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const main = async () => {
  console.log('register');

  const jwtToken: JwtToken | null = idController.register(
    'test.email@testemail.com',
    'StrongPassword123!'
  );

  // prints out token
  printOrNullError(jwtToken);

  await sleep(1000);
  console.log('\nre-register to original');

  // re-registering with same credentials
  const jwtToken2: JwtToken | null = idController.register(
    'test.email@testemail.com',
    'StrongPassword123!'
  );

  // prints out null token error.
  printOrNullError(jwtToken2);

  await sleep(1000);
  console.log('\nSign-in to original');

  const jwtTokenSignIn: JwtToken | null = idController.signIn(
    'test.email@testemail.com',
    'StrongPassword123!'
  );

  // prints out token with different signature to original
  // as new token assigned
  printOrNullError(jwtTokenSignIn);

  await sleep(1000);
  console.log('\nAdmin sign-in');

  // ! since jwtToken can't be null
  console.log(dataController.getData(jwtToken!));

  const adminJwt: JwtToken | null = idController.signIn(
    'adminuser@test.com',
    'adm1np$ss123!'
  );

  printOrNullError(adminJwt);

  await sleep(1000);
  console.log('\nNon-admin create data');

  const newData: Data = {
    sku: 'PRODUCT-FOUR-PURPLE-40',
    brand: 'another brand',
    price: 19.99,
    qty: 1,
  };

  console.log(dataController.addData(jwtToken!, newData));

  console.log('\nAdmin create data');
  console.log(dataController.addData(adminJwt!, newData));

  await sleep(5000);
  console.log('\nAdmin creating new data later');

  const newData2: Data = {
    sku: 'PRODUCT-FIVE-YELLOW-41',
    brand: 'some brand',
    price: 29.99,
    qty: 2,
  };

  console.log(dataController.addData(adminJwt!, newData2)); // invalid since expired
};
main();
