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
exports.exportWalletScene = void 0;
const telegraf_1 = require("telegraf");
const utils_1 = require("../utils");
const utils_2 = require("../utils");
const mini_1 = require("../share/mini");
exports.exportWalletScene = new telegraf_1.Scenes.BaseScene("exportWalletScene");
exports.exportWalletScene.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const password = ctx.scene.state.password;
    try {
        const key = (0, utils_2.decrypt)(ctx.session.wallet.privateKey, password);
        if (!key)
            throw "no key";
        ctx.reply(`Your wallet private key is <code>${key}</code> \n <b>⚠ Warning: Never disclose or store digitally this key. Anyone with your private keys can steal any assets held in your account.</b>`, {
            parse_mode: "HTML",
        });
        yield ctx.scene.leave();
        setTimeout(() => {
            (0, mini_1.showMenu)(ctx);
        }, 500);
    }
    catch (err) {
        const exitButton = (0, utils_1.createCallBackBtn)("Retry Later", "retry_later");
        ctx.reply("😔 Wrong password. Please try again.", {
            reply_markup: {
                force_reply: true,
                input_field_placeholder: 'Enter password',
                inline_keyboard: [[exitButton]],
            }
        });
        ctx.scene.enter('passwordScene', { next: 'exportWalletScene' });
    }
}));
//# sourceMappingURL=exportWalletScene.js.map