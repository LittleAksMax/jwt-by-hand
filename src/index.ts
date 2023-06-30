import IdentityController from './auth/identityController';
import JwtToken from './jwt/token';

const idController: IdentityController = new IdentityController();

const jwtToken: JwtToken | null = idController.register(
  'test.email@testemail.com',
  'StrongPassword123!'
);

// prints out token
if (jwtToken === null) {
  console.log('Null token. Error in registration');
} else {
  console.log(jwtToken.toString());
}

// re-registering with same credentials
const jwtToken2: JwtToken | null = idController.register(
  'test.email@testemail.com',
  'StrongPassword123!'
);

// prints out null token error.
if (jwtToken2 === null) {
  console.log('Null token. Error in registration');
} else {
  console.log(jwtToken2.toString());
}
