"use strict";
/**
 * This file contains all of the hash handlers for all the
 * algorithms implemented. For now it is only the HS256 algorithm
 * handler.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HS256Handler = void 0;
const crypto_1 = require("crypto");
class HS256Handler {
    constructor() {
        this.hash = (toHash, keyBuffer) => {
            const hashed = (0, crypto_1.createHmac)('SHA256', keyBuffer)
                .update(toHash)
                .digest('base64url');
            return hashed;
        };
    }
}
exports.HS256Handler = HS256Handler;
