"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMenu = void 0;
const utils_1 = require("../utils");
const showMenu = (ctx) => {
    // Create a buttons for creating and exporting wallets
    const walletButton = (0, utils_1.createCallBackBtn)("Wallet", "wallet");
    const stakingButton = (0, utils_1.createCallBackBtn)("Staking", "staking");
    const launchpadButton = (0, utils_1.createCallBackBtn)("Launchpad", "launchpad");
    const bridgeButton = (0, utils_1.createCallBackBtn)("Bridge", "bridge");
    const buyKomButton = (0, utils_1.createCallBackBtn)("Buy KOM", "buy-com");
    // Send message with the import wallet button
    const message = `<b>⚡ Welcome to Ronaldo Kommunitas</b>\n\n⚠️ We strongly advise that you use any of the following bots to trade with. You will have the same wallets and settingsacross all bots, but any of the below will be significantly faster due to lighter user load.`;
    ctx.reply(message, {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [walletButton],
                [stakingButton, launchpadButton],
                [bridgeButton, buyKomButton]
            ],
        },
    });
};
exports.showMenu = showMenu;
//# sourceMappingURL=mini.js.map