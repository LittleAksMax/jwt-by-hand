"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identityService_1 = __importDefault(require("../auth/identityService"));
const productDatabase_1 = __importDefault(require("./productDatabase"));
class DataController {
    constructor(tokFactory, tokVerifier, decoder) {
        // this is meant to simulate an endpoint requiring authorization
        this.getData = (jwtToken) => {
            if (!this._idService.verifyToken(jwtToken)) {
                return null;
            }
            // return copy of the data
            return productDatabase_1.default.copyWithin(0, productDatabase_1.default.length);
        };
        this._idService = new identityService_1.default(tokFactory, tokVerifier, decoder);
    }
}
exports.default = DataController;
