"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const encrypt = (text, key) => {
    return crypto_js_1.default.AES.encrypt(text, key ? key : process.env.BOT_TOKEN).toString();
};
exports.encrypt = encrypt;
const decrypt = (cipherText, key) => {
    const bytes = crypto_js_1.default.AES.decrypt(cipherText, key ? key : process.env.BOT_TOKEN);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
exports.decrypt = decrypt;
//# sourceMappingURL=utils.js.map