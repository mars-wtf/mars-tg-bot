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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const telegraf_1 = require("telegraf");
const scenes_1 = require("./bot/scenes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
app.set("trust proxy", true);
//@ts-ignore
app.use((0, cors_1.default)("*"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const _bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
//@ts-ignore
const stages = new telegraf_1.Scenes.Stage([scenes_1.uploadScene]);
// use TG's session
_bot.use((0, telegraf_1.session)());
// use tg scene's middlewares
_bot.use(stages.middleware());
/**
 * @command /start
 * when the bot is running...
 */
_bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx.chat.id);
    const message = `Welcome to mars bot. Your chat id is ${ctx.chat.id}`;
    // Create a buttons for creating and exporting wallets
    // const uploadLogoButton = createCallBackBtn("Upload Logo", "upload-logo");
    // // const importWalletButton = createCallBackBtn("Import Existing Wallet", "import-wallet");
    // // Send message with the import wallet button
    // ctx.reply(message, {
    //     reply_markup: {
    //         inline_keyboard: [[uploadLogoButton]],
    //     },
    // });
}));
// Handle create wallet button click
_bot.action('upload-logo', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.scene.enter("uploadScene");
}));
// Handle create wallet button click
_bot.command("photo", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // await ctx.scene.enter("uploadScene");
    sendAds(10, 10, "https://aa.com", 3);
}));
const sendAds = (amount, num, link, index) => {
    const data = [
        { logo: 'https://ipfs.io/ipfs/QmYzEJPSWaD7bXYoRKLSb4JbVbAzTuvYftXBqu7VYGLCKy', type: 'sendPhoto' },
        { logo: 'https://ipfs.io/ipfs/Qmf9qnekiKEzvAie3kG52yt4f36R8c5LhZuzzrb8AZYbzx', type: 'sendPhoto' },
        { logo: 'https://ipfs.io/ipfs/Qmd1vTAnk3o9idiNuu6d3sfYJzeuRkiJSqyaVNnagUv4dK', type: 'sendAnimation' },
        { logo: 'https://ipfs.io/ipfs/QmefNXKRiJaZZaUjoV4eR335d7aEpdNHkMuEhLk5pqPuNN', type: 'sendAnimation' },
    ];
    const { logo, type } = data[index];
    const jwels = new Array(Number(num)).fill('1').reduce((acc, item) => (acc + '💎'), "");
    const msg = `\n🌹 PURCHASE TOKEN 🌹\n` +
        `\n💪 Customers who purchase tokens worth 100 USDT/ETH or more will receive a token bonus percentage corresponding to 💪\n` +
        `\n🏆🥇🥈🥉🏅 the amount they have purchased. The higher your purchase amount, the higher your bonus percentage will be. 💪\n` +
        `\nNew Buy: 💥Mars WTF💥\n` +
        `\n🏆 ${amount} mars 🏆` +
        `\n\n${jwels}` +
        `\n\n 🛒 <a href="${link}"><b>See Transaction</b></a>`;
    _bot.telegram[type](-1002114550040, logo, {
        caption: msg,
        parse_mode: "HTML",
    });
};
app.post("/new_buy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, amount, index, num } = req.body;
    if (link && amount && index && num) {
        sendAds(amount, num, link, index);
        res.json("success");
    }
    else {
        res.json("invalid");
    }
}));
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
    _bot.launch();
    console.log("start...");
});
//# sourceMappingURL=server.js.map