import { Markup } from "telegraf";
import { Wallet } from 'ethers';
import { encrypt, decrypt } from "./utils";

export const createCallBackBtn = (btnLabel: string, cbActionCommand: string) => {
    return Markup.button.callback(btnLabel, cbActionCommand);
}

export const generateAccount = (phrase: string, index = 0) => {
    /**
     * If the phrase does not contain spaces, it is likely a private key
     */
    const wallet = phrase.includes(" ")
        ? Wallet.fromMnemonic(phrase, `m/44'/60'/0'/0/${index}`)
        : new Wallet(phrase);

    return {
        address: wallet.address,
        privateKey: encrypt(wallet.privateKey),
        mnemonic: encrypt(phrase),
    };
}

export const createWallet = (password?: string) => {
    const wallet = Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: encrypt(wallet.privateKey, password),
        mnemonic: encrypt(wallet.mnemonic.phrase, password),
    };
}
