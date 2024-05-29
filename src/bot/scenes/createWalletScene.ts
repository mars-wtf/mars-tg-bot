import { Scenes, Context } from 'telegraf';
import { generateAccount, createCallBackBtn, createWallet } from "../utils";

export const createWalletScene = new Scenes.BaseScene<Context>("createWalletScene");

createWalletScene.enter(async (ctx: any) => {
  const password: string = ctx.scene.state.password;
  const wallet = await createWallet(password);
    // Create a button for export private key
    const exportPrivatekeyButton = createCallBackBtn("Export Private Key", "export-wallet");
    // Send message with the import wallet button
    ctx.reply(`🎉   Your wallet has been successfully created. Your wallet address is <code>${wallet.address}</code>.`,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[exportPrivatekeyButton]],
        }
      }
    );
    ctx.session.wallet = wallet;
    ctx.scene.leave();
}
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
