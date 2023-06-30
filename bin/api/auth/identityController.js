"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identityService_1 = __importDefault(require("./identityService"));
const userService_1 = __importDefault(require("./userService"));
class IdentityController {
    constructor(tokFactory, tokVerifier, decoder) {
        this.register = (email, password) => {
            const createdUser = this._userService.createUser(email, password);
            if (createdUser === null) {
                return null; // there was an error
            }
            const token = this._idService.signToken(createdUser);
            return token;
        };
        this.signIn = (email, password) => {
            const existingUser = this._userService.getUser(email, password);
            if (existingUser === null) {
                return null; // user doesn't exist, therefore can't sign in
            }
            const token = this._idService.signToken(existingUser);
            return token;
        };
        this.refresh = () => {
            throw new Error('Not implemented');
        };
        this._idService = new identityService_1.default(tokFactory, tokVerifier, decoder);
        this._userService = new userService_1.default();
    }
}
exports.default = IdentityController;
