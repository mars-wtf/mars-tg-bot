import { generateAccount, createCallBackBtn, createWallet } from "../utils";
export const showMenu = (ctx: any) => {
    // Create a buttons for creating and exporting wallets
    const walletButton = createCallBackBtn("Wallet", "wallet");
    const stakingButton = createCallBackBtn("Staking", "staking");
    const launchpadButton = createCallBackBtn("Launchpad", "launchpad");
    const bridgeButton = createCallBackBtn("Bridge", "bridge");
    const buyKomButton = createCallBackBtn("Buy KOM", "buy-com");
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
}