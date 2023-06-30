"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const userDatabase_1 = __importDefault(require("./userDatabase"));
class UserService {
    constructor() {
        this.createUser = (email, password) => {
            const users = userDatabase_1.default.filter((x) => x.email === email);
            if (users.length !== 0) {
                // should not match any pre-existing users
                return null; // conflict error
            }
            const newUser = { id: (0, uuid_1.v4)(), email, password };
            userDatabase_1.default.push(newUser); // add user to 'database'
            return newUser;
        };
        this.getUser = (email, password) => {
            const users = userDatabase_1.default.filter((x) => x.email === email && x.password === password);
            if (users.length !== 1) {
                // should only match a single user
                return null; // error
            }
            const user = users[0];
            return user;
        };
    }
}
exports.default = UserService;
