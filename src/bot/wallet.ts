import { createCallBackBtn } from "./utils";
import { Telegraf, Scenes, session, Context } from "telegraf";
import { decrypt } from "./utils";

export default (_bot: any) => {
    /**
   * @command /start
   * when the bot is running...
   */
  _bot.command("start", async (ctx: Context) => {
    const message = `Welcome to the KOM trading Bot! Do you have an existing wallet or create new one?`;

    // Create a buttons for creating and exporting wallets
    const createWalletButton = createCallBackBtn("Create New Wallet", "create-wallet");
    const importWalletButton = createCallBackBtn("Import Existing Wallet", "import-wallet");

    // Send message with the import wallet button
    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [[createWalletButton, importWalletButton]],
      },
    });

    
  });

  // Handle import wallet button click
  _bot.action('import-wallet', async (ctx: any) => {
    ctx.scene.enter("passwordScene", { next: "importWalletScene" });
  });

  // Handle export wallet button click
  _bot.action('export-wallet', async (ctx: any) => {
    if (ctx.session.wallet) {
      await ctx.scene.enter("passwordScene", { next: "exportWalletScene" });
    } else {
      const createWalletButton = createCallBackBtn("Create New Wallet", "create-wallet");
      const importWalletButton = createCallBackBtn("Import Existing Wallet", "import-wallet");
      // Send message with the import wallet button
      const message = `You have no wallet! Do you have an existing wallet or create new one?`;
      ctx.reply(message, {
        reply_markup: {
          inline_keyboard: [[createWalletButton, importWalletButton]],
        },
      });
    }
  });

  // Handle create wallet button click
  _bot.action('create-wallet', async (ctx: any) => {
    await ctx.scene.enter("passwordScene", { next: "createWalletScene" });
  });

  // Handle create wallet button click
  _bot.action('retry_later', async (ctx: any) => {
    ctx.scene.leave ();

    // Create a buttons for creating and exporting wallets
    const createWalletButton = createCallBackBtn("Create New Wallet", "create-wallet");
    const importWalletButton = createCallBackBtn("Import Existing Wallet", "import-wallet");
    // Send message with the import wallet button
    const message = `Welcome to the KOM trading Bot! Do you have an existing wallet or create new one?`;
    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [[createWalletButton, importWalletButton]],
      },
    });
  });

  /**
   * @command /test
   * test...
   */
  _bot.command("see", async (ctx: any) => {
    if (ctx.session.wallet) {
      ctx.reply(`Your wallet address is <code>${ctx.session.wallet.address}</code>`, { parse_mode: "HTML" });
    } else {
      ctx.reply("⚠ You have not imported any wallet yet.");
    }
  });

  /**
   * @command /see_priv
   * test...
   */
  _bot.command("see_priv", async (ctx: any) => {
    if (ctx.session.wallet) {
      ctx.reply(
        `Your wallet private key is <code>${decrypt(ctx.session.wallet.privateKey)}</code> \n <b>⚠ Warning: Never disclose or store digitally this key. Anyone with your private keys can steal any assets held in your account.</b>`,
        {
          parse_mode: "HTML",
        }
      );
    } else {
      ctx.reply("⚠ You have not imported any wallet yet.");
    }
  });
}