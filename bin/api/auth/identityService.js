"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class IdentityService {
    constructor(tokFactory, tokVerifier, decoder) {
        // secret is at least as long as algorithm -- e.g., HMACSHA256 requires
        // 256-bit key AT LEAST
        // store this securely somewhere, don't use a weak one like below
        // I pulled this from some random generator website
        this._secretKey = 'U1bCHsMZfSSwzplfaIMVaHmZG3BmLafc';
        this.verifyToken = (jwtToken) => {
            const header = jwtToken.header;
            const payload = jwtToken.payload;
            const signature = jwtToken.signature;
            const headerObj = JSON.parse(this._decoder.base64UrlDecode(header));
            const verified = this._tokVerifier.verify(header, payload, signature, headerObj.alg, this._secretKey);
            return verified;
        };
        this.signToken = (user) => {
            const header = {
                alg: 'HS256',
                typ: 'JWT',
            };
            const payload = {
                sub: user.id,
                iss: 'issuer',
                exp: 1200,
                iat: Date.now() / 1000,
                aud: 'audience',
                jti: (0, uuid_1.v4)(),
                // other flags of my own for user claims
                eml: user.email,
            };
            return this._tokFactory.create(header, payload, this._secretKey);
        };
        this._decoder = decoder;
        this._tokFactory = tokFactory;
        this._tokVerifier = tokVerifier;
    }
}
exports.default = IdentityService;
