// export default () => {
//   const _bot = new Telegraf(process.env.BOT_TOKEN);
//   //@ts-ignore
//   const stages = new Scenes.Stage([uploadScene]);
//   // use TG's session
//   _bot.use(session());
//   // use tg scene's middlewares
//   _bot.use(stages.middleware());
//   _bot.launch();
//   console.log("start...")
//   /**
//    * @command /start
//    * when the bot is running...
//    */
//   _bot.command("start", async (ctx: Context) => {
//     console.log(ctx.chat.id)
//     const message = `Welcome to the KOM trading Bot! Do you have an existing wallet or create new one?`;
//     // Create a buttons for creating and exporting wallets
//     const uploadLogoButton = createCallBackBtn("Upload Logo", "upload-logo");
//     // const importWalletButton = createCallBackBtn("Import Existing Wallet", "import-wallet");
//     // Send message with the import wallet button
//     ctx.reply(message, {
//       reply_markup: {
//         inline_keyboard: [[uploadLogoButton]],
//       },
//     });
//   });
//   // Handle create wallet button click
//   _bot.action('upload-logo', async (ctx: any) => {
//     await ctx.scene.enter("uploadScene");
//   });
//   _bot.command("rhs", async (ctx: Context) => {
//     ctx.reply("Legendary crypto dev");
//   });
//   _bot.command("jcb", async (ctx: Context) => {
//     ctx.reply("senior fullstack dev");
//   });
//   _bot.command("ksr", async (ctx: Context) => {
//     ctx.reply("trying to be a junior crypto dev & trainee");
//   });
//   _bot.on("document", async (ctx) => {
//     console.log("document");
//     const document = ctx.message.document;
//     // const _focusedGroupId = focusedGroupId;
//     // const _focusedMedia = focusedMedia;
//     console.log(document)
//     // _uploadMedia(ctx, document, _focusedGroupId, _focusedMedia);
//   });
//   _bot.on('photo', async (ctx) => {
//     const photo = ctx.message.photo;
//     // Access the array of photo sizes
//     // The last element in the array is the original photo
//     const photoId = photo[photo.length - 1].file_id;
//     // Use the photoId to get the file path
//     const fileLink = await ctx.telegram.getFileLink(photoId);
//     // Process the fileLink as needed (e.g., download the image)
//     console.log('File link:', fileLink);
//   });
// }
//# sourceMappingURL=index.js.map