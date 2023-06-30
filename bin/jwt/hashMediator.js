"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashHandlers_1 = require("./hashHandlers");
/**
 * Mediator class to provide the handlers to hash for each
 * type of algorithm. For now only the HS256 algorithm is supported,
 * but I used this mediator pattern to make the implementation of other
 * algorithms much easier.
 */
class HashMediator {
    constructor() {
        this.provideHandler = (hashType) => {
            switch (hashType) {
                // add other cases for other algorithms, each with their own
                // handler instance
                case 'HS256':
                    return new hashHandlers_1.HS256Handler();
                default:
                    throw new Error('Unknown hash type: ' + hashType);
            }
        };
    }
}
exports.default = HashMediator;
