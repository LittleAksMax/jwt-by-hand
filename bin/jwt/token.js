"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class JwtToken {
    /* GETTERS for the header, payload and signature */
    get header() {
        return this._header;
    }
    get payload() {
        return this._payload;
    }
    get signature() {
        return this._signature;
    }
    /* */
    constructor(header, payload, _signature) {
        this.toString = (coloured = true) => {
            // empty wrapper so if not coloured then don't do anything
            // to the strings
            const emptyWrapper = (s) => s;
            const red = coloured ? chalk_1.default.red : () => emptyWrapper;
            const mag = coloured ? chalk_1.default.magenta : () => emptyWrapper;
            const blu = coloured ? chalk_1.default.blueBright : () => emptyWrapper;
            return `${red(this._header)}.${mag(this._payload)}.${blu(this._signature)}`;
        };
        this._header = header;
        this._payload = payload;
        this._signature = _signature;
    }
}
exports.default = JwtToken;
