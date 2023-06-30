"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = exports.Encoder = void 0;
/**
 * This is just a class that can encode strings into base64url format.
 */
class Encoder {
    constructor() {
        this.base64UrlEncode = (toEncode) => {
            // Buffer.from(str).toString('base64url') just creates a buffer
            // with the exact bytes used in the string str, and then converts it
            // to a string that displays those encoded bytes in base64url format.
            const base64Url = Buffer.from(toEncode).toString('base64url');
            return base64Url;
        };
    }
}
exports.Encoder = Encoder;
class Decoder {
    constructor() {
        this.base64UrlDecode = (toDecode) => {
            const utf8 = Buffer.from(toDecode, 'base64url').toString('utf-8');
            return utf8;
        };
    }
}
exports.Decoder = Decoder;
