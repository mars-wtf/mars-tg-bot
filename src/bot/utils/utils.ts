import crypto from 'crypto-js';

export const encrypt = (text: string, key?: string) => {
    return crypto.AES.encrypt(text, key ? key : process.env.BOT_TOKEN).toString();
}

export const decrypt = (cipherText: string, key?: string) => {
    const bytes = crypto.AES.decrypt(cipherText, key ? key : process.env.BOT_TOKEN);
    return bytes.toString(crypto.enc.Utf8);
}