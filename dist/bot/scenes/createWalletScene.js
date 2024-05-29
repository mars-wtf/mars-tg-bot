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
exports.createWalletScene = void 0;
const telegraf_1 = require("telegraf");
const utils_1 = require("../utils");
exports.createWalletScene = new telegraf_1.Scenes.BaseScene("createWalletScene");
exports.createWalletScene.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const password = ctx.scene.state.password;
    const wallet = yield (0, utils_1.createWallet)(password);
    // Create a button for export private key
    const exportPrivatekeyButton = (0, utils_1.createCallBackBtn)("Export Private Key", "export-wallet");
    // Send message with the import wallet button
    ctx.reply(`🎉   Your wallet has been successfully created. Your wallet address is <code>${wallet.address}</code>.`, {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [[exportPrivatekeyButton]],
        }
    });
    ctx.session.wallet = wallet;
    ctx.scene.leave();
})
// ctx.reply("Please enter private key or 12-word mnemonic.", {
//   reply_markup: {
//     force_reply: true,
//     input_field_placeholder: 'Enter password'
//   }
// })
);
// createWalletScene.on("text", (ctx: any) => {
//   const phrase = ctx.message.text;
//   try {
//     const wallet = generateAccount(phrase);
//     ctx.session.wallet = wallet;
//     ctx.reply(
//       `🎉 Your wallet has been successfully imported. Your wallet address is <code>${wallet.address}</code>.`, { parse_mode: "HTML" }
//     );
//     ctx.scene.leave();
//   } catch (error) {
//     const exitButton = createCallBackBtn("Retry Later", "retry_later");
//     ctx.reply(
//       "😔 This does not appear to be a valid private key / mnemonic phrase. Please try again.",
//       {
//         reply_markup: {
//           force_reply: true,
//           input_field_placeholder: 'Enter password',
//           inline_keyboard: [[exitButton]],
//         }
//       })
//   }
// });
//# sourceMappingURL=createWalletScene.js.map