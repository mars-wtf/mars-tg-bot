import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Telegraf, Scenes, session, Context } from "telegraf";
import { createCallBackBtn } from "./bot/utils";
import {
    uploadScene
} from "./bot/scenes";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: Number = process.env.PORT ? Number(process.env.PORT) : 8000;
app.set("trust proxy", true);
//@ts-ignore
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const _bot = new Telegraf(process.env.BOT_TOKEN);
//@ts-ignore
const stages = new Scenes.Stage([uploadScene]);
// use TG's session
_bot.use(session());
// use tg scene's middlewares
_bot.use(stages.middleware());


/**
 * @command /start
 * when the bot is running...
 */
_bot.command("start", async (ctx: Context) => {
    console.log(ctx.chat.id)
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
});

// Handle create wallet button click
_bot.action('upload-logo', async (ctx: any) => {
    await ctx.scene.enter("uploadScene");
});


// Handle create wallet button click
_bot.command("photo", async (ctx: any) => {
    // await ctx.scene.enter("uploadScene");
    sendAds(10, 10, "https://aa.com", 3)
});

const sendAds = (amount: number, num: number, link: string, index: number) => { 
    const data = [
        { logo: 'https://ipfs.io/ipfs/QmYzEJPSWaD7bXYoRKLSb4JbVbAzTuvYftXBqu7VYGLCKy', type: 'sendPhoto' },
        { logo: 'https://ipfs.io/ipfs/Qmf9qnekiKEzvAie3kG52yt4f36R8c5LhZuzzrb8AZYbzx', type: 'sendPhoto' },
        { logo: 'https://ipfs.io/ipfs/Qmd1vTAnk3o9idiNuu6d3sfYJzeuRkiJSqyaVNnagUv4dK', type: 'sendAnimation' },
        { logo: 'https://ipfs.io/ipfs/QmefNXKRiJaZZaUjoV4eR335d7aEpdNHkMuEhLk5pqPuNN', type: 'sendAnimation' },
    ]
    const { logo, type } = data[index];
    const jwels = new Array(Number(num)).fill('1').reduce((acc: string, item: any) => (acc + '💎'), "");
    const msg = 
    `\n🌹 PURCHASE TOKEN 🌹\n` +
    `\n💪 Customers who purchase tokens worth 100 USDT/ETH or more will receive a token bonus percentage corresponding to 💪\n` +
    `\n🏆🥇🥈🥉🏅 the amount they have purchased. The higher your purchase amount, the higher your bonus percentage will be. 💪\n` +
    `\nNew Buy: 💥Mars WTF💥\n` +
    `\n🏆 ${amount} mars 🏆` +
    `\n\n${jwels}` +
    `\n\n 🛒 <a href="${link}"><b>See Transaction</b></a>`
    _bot.telegram [type] (-4192465370, logo, {
        caption: msg,
        parse_mode: "HTML",
    });
}

app.post("/new_buy", async (req: Request, res: Response) => {
    const { link, amount, index, num } = req.body;
    if (link && amount && index && num) {
        sendAds (amount, num, link, index);
        res.json("success")
    } else {
        res.json("invalid")
    }
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
    _bot.launch();
    console.log("start...");
});


