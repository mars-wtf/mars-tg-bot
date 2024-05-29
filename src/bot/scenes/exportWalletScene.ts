import { Scenes, Context } from 'telegraf';
import { generateAccount, createCallBackBtn, createWallet } from "../utils";
import { decrypt } from '../utils';
import { showMenu } from '../share/mini';

export const exportWalletScene = new Scenes.BaseScene<Context>("exportWalletScene");

exportWalletScene.enter(async (ctx: any) => {
  const password: string = ctx.scene.state.password;
  try {
    const key = decrypt(ctx.session.wallet.privateKey, password);
    if (!key) throw "no key";
    ctx.reply(
      `Your wallet private key is <code>${key}</code> \n <b>⚠ Warning: Never disclose or store digitally this key. Anyone with your private keys can steal any assets held in your account.</b>`,
      {
        parse_mode: "HTML",
      }
    );
    await ctx.scene.leave();
    setTimeout(() => {
      showMenu (ctx);
    }, 500);
  } catch (err) {
    const exitButton = createCallBackBtn("Retry Later", "retry_later");
    ctx.reply(
      "😔 Wrong password. Please try again.",
      {
        reply_markup: {
          force_reply: true,
          input_field_placeholder: 'Enter password',
          inline_keyboard: [[exitButton]],
        }
      }
    );
    ctx.scene.enter('passwordScene', { next: 'exportWalletScene' });
  }
});
