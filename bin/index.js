"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identityController_1 = __importDefault(require("./api/auth/identityController"));
const dataController_1 = __importDefault(require("./api/data/dataController"));
const coders_1 = require("./jwt/coders");
const tokenFactory_1 = __importDefault(require("./jwt/tokenFactory"));
const tokenVerifier_1 = __importDefault(require("./jwt/tokenVerifier"));
// my bad simple version of dependency injection (I'm lazy)
const encoder = new coders_1.Encoder();
const decoder = new coders_1.Decoder();
const tokFactory = new tokenFactory_1.default(encoder);
const tokVerifier = new tokenVerifier_1.default(encoder);
const idController = new identityController_1.default(tokFactory, tokVerifier, decoder);
const dataController = new dataController_1.default(tokFactory, tokVerifier, decoder);
const printOrNullError = (jwtToken) => {
    if (jwtToken === null) {
        console.log('Null token. Error in registration');
    }
    else {
        console.log(jwtToken.toString());
    }
};
const jwtToken = idController.register('test.email@testemail.com', 'StrongPassword123!');
// prints out token
printOrNullError(jwtToken);
// re-registering with same credentials
const jwtToken2 = idController.register('test.email@testemail.com', 'StrongPassword123!');
// prints out null token error.
printOrNullError(jwtToken2);
const jwtTokenSignIn = idController.signIn('test.email@testemail.com', 'StrongPassword123!');
// prints out token with different signature to original
// as new token assigned
printOrNullError(jwtTokenSignIn);
// ! since jwtToken can't be null
console.log(dataController.getData(jwtToken));
