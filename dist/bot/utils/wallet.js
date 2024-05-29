"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = exports.generateAccount = exports.createCallBackBtn = void 0;
const telegraf_1 = require("telegraf");
const ethers_1 = require("ethers");
const utils_1 = require("./utils");
const createCallBackBtn = (btnLabel, cbActionCommand) => {
    return telegraf_1.Markup.button.callback(btnLabel, cbActionCommand);
};
exports.createCallBackBtn = createCallBackBtn;
const generateAccount = (phrase, index = 0) => {
    /**
     * If the phrase does not contain spaces, it is likely a private key
     */
    const wallet = phrase.includes(" ")
        ? ethers_1.Wallet.fromMnemonic(phrase, `m/44'/60'/0'/0/${index}`)
        : new ethers_1.Wallet(phrase);
    return {
        address: wallet.address,
        privateKey: (0, utils_1.encrypt)(wallet.privateKey),
        mnemonic: (0, utils_1.encrypt)(phrase),
    };
};
exports.generateAccount = generateAccount;
const createWallet = (password) => {
    const wallet = ethers_1.Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: (0, utils_1.encrypt)(wallet.privateKey, password),
        mnemonic: (0, utils_1.encrypt)(wallet.mnemonic.phrase, password),
    };
};
exports.createWallet = createWallet;
//# sourceMappingURL=wallet.js.map