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
const utils_1 = require("./utils");
const utils_2 = require("./utils");
exports.default = (_bot) => {
    /**
   * @command /start
   * when the bot is running...
   */
    _bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const message = `Welcome to the KOM trading Bot! Do you have an existing wallet or create new one?`;
        // Create a buttons for creating and exporting wallets
        const createWalletButton = (0, utils_1.createCallBackBtn)("Create New Wallet", "create-wallet");
        const importWalletButton = (0, utils_1.createCallBackBtn)("Import Existing Wallet", "import-wallet");
        // Send message with the import wallet button
        ctx.reply(message, {
            reply_markup: {
                inline_keyboard: [[createWalletButton, importWalletButton]],
            },
        });
    }));
    // Handle import wallet button click
    _bot.action('import-wallet', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        ctx.scene.enter("passwordScene", { next: "importWalletScene" });
    }));
    // Handle export wallet button click
    _bot.action('export-wallet', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.session.wallet) {
            yield ctx.scene.enter("passwordScene", { next: "exportWalletScene" });
        }
        else {
            const createWalletButton = (0, utils_1.createCallBackBtn)("Create New Wallet", "create-wallet");
            const importWalletButton = (0, utils_1.createCallBackBtn)("Import Existing Wallet", "import-wallet");
            // Send message with the import wallet button
            const message = `You have no wallet! Do you have an existing wallet or create new one?`;
            ctx.reply(message, {
                reply_markup: {
                    inline_keyboard: [[createWalletButton, importWalletButton]],
                },
            });
        }
    }));
    // Handle create wallet button click
    _bot.action('create-wallet', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.scene.enter("passwordScene", { next: "createWalletScene" });
    }));
    // Handle create wallet button click
    _bot.action('retry_later', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        ctx.scene.leave();
        // Create a buttons for creating and exporting wallets
        const createWalletButton = (0, utils_1.createCallBackBtn)("Create New Wallet", "create-wallet");
        const importWalletButton = (0, utils_1.createCallBackBtn)("Import Existing Wallet", "import-wallet");
        // Send message with the import wallet button
        const message = `Welcome to the KOM trading Bot! Do you have an existing wallet or create new one?`;
        ctx.reply(message, {
            reply_markup: {
                inline_keyboard: [[createWalletButton, importWalletButton]],
            },
        });
    }));
    /**
     * @command /test
     * test...
     */
    _bot.command("see", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.session.wallet) {
            ctx.reply(`Your wallet address is <code>${ctx.session.wallet.address}</code>`, { parse_mode: "HTML" });
        }
        else {
            ctx.reply("⚠ You have not imported any wallet yet.");
        }
    }));
    /**
     * @command /see_priv
     * test...
     */
    _bot.command("see_priv", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.session.wallet) {
            ctx.reply(`Your wallet private key is <code>${(0, utils_2.decrypt)(ctx.session.wallet.privateKey)}</code> \n <b>⚠ Warning: Never disclose or store digitally this key. Anyone with your private keys can steal any assets held in your account.</b>`, {
                parse_mode: "HTML",
            });
        }
        else {
            ctx.reply("⚠ You have not imported any wallet yet.");
        }
    }));
};
//# sourceMappingURL=wallet.js.map