"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashMediator_1 = __importDefault(require("./hashMediator"));
const token_1 = __importDefault(require("./token"));
class TokenFactory {
    constructor(encoder) {
        this.create = (header, payload, secretKey, base64EncodeSecretKey = false) => {
            const sHeader = JSON.stringify(header);
            const encodedHeader = this._encoder.base64UrlEncode(sHeader);
            const sPayload = JSON.stringify(payload);
            const encodedPayload = this._encoder.base64UrlEncode(sPayload);
            // find hash handler based on algorithm specified in header.
            const hashHandler = this._mediator.provideHandler(header.alg);
            if (hashHandler === null) {
                throw new Error('Invalid hash algorithm type provided');
            }
            const signature = hashHandler.hash(`${encodedHeader}.${encodedPayload}`, base64EncodeSecretKey
                ? Buffer.from(secretKey, 'base64url')
                : Buffer.from(secretKey));
            return new token_1.default(encodedHeader, encodedPayload, signature);
        };
        this._encoder = encoder;
        this._mediator = new hashMediator_1.default();
    }
}
exports.default = TokenFactory;
