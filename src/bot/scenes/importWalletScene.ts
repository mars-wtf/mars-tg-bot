import { Scenes, Context } from 'telegraf';
import { generateAccount, createCallBackBtn } from "../utils";
import { showMenu } from '../share/mini';

export const importWalletScene = new Scenes.BaseScene("importWalletScene");

importWalletScene.enter((ctx) =>
  ctx.reply("Please enter private key or 12-word mnemonic.", {
    reply_markup: {
      force_reply: true,
      input_field_placeholder: 'Enter password'
    }
  })
);

importWalletScene.on("text", async (ctx: any) => {
  const phrase = ctx.message.text;
  try {
    const wallet = generateAccount(phrase);
    ctx.session.wallet = wallet;
    ctx.reply(
      `🎉 Your wallet has been successfully imported. Your wallet address is <code>${wallet.address}</code>.`, { parse_mode: "HTML" }
    );
    await ctx.scene.leave();
    setTimeout(() => {
      showMenu (ctx);
    }, 500);
  } catch (error) {
    const exitButton = createCallBackBtn("Retry Later", "retry_later");
    ctx.reply(
      "😔 This does not appear to be a valid private key / mnemonic phrase. Please try again.",
      {
        reply_markup: {
          force_reply: true,
          input_field_placeholder: 'Enter password',
          inline_keyboard: [[exitButton]],
        }
      }
    )
  }
});
