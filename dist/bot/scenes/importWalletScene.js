"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importWalletScene = void 0;
const telegraf_1 = require("telegraf");
const utils_1 = require("../utils");
const mini_1 = require("../share/mini");
exports.importWalletScene = new telegraf_1.Scenes.BaseScene("importWalletScene");
exports.importWalletScene.enter((ctx) => ctx.reply("Please enter private key or 12-word mnemonic.", {
    reply_markup: {
        force_reply: true,
        input_field_placeholder: 'Enter password'
    }
}));
exports.importWalletScene.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const phrase = ctx.message.text;
    try {
        const wallet = (0, utils_1.generateAccount)(phrase);
        ctx.session.wallet = wallet;
        ctx.reply(`🎉 Your wallet has been successfully imported. Your wallet address is <code>${wallet.address}</code>.`, { parse_mode: "HTML" });
        yield ctx.scene.leave();
        setTimeout(() => {
            (0, mini_1.showMenu)(ctx);
        }, 500);
    }
    catch (error) {
        const exitButton = (0, utils_1.createCallBackBtn)("Retry Later", "retry_later");
        ctx.reply("😔 This does not appear to be a valid private key / mnemonic phrase. Please try again.", {
            reply_markup: {
                force_reply: true,
                input_field_placeholder: 'Enter password',
                inline_keyboard: [[exitButton]],
            }
        });
    }
}));
//# sourceMappingURL=importWalletScene.js.map