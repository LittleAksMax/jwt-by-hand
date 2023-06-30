"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashMediator_1 = __importDefault(require("./hashMediator"));
class TokenVerifier {
    constructor(encoder) {
        this.verify = (header, payload, signatureToCompareTo, hashType, secretKey, base64EncodeSecretKey = false) => {
            const toHash = this._encoder.base64UrlEncode(`${header}.${payload}`);
            const hashHandler = this._mediator.provideHandler(hashType);
            const generatedSignature = hashHandler.hash(toHash, base64EncodeSecretKey
                ? Buffer.from(secretKey, 'base64url')
                : Buffer.from(secretKey));
            return signatureToCompareTo === generatedSignature;
        };
        this._encoder = encoder;
        this._mediator = new hashMediator_1.default();
    }
}
exports.default = TokenVerifier;
