import { Scenes, Context } from 'telegraf';

export const uploadScene = new Scenes.BaseScene<Context>("uploadScene");

uploadScene.enter(async (ctx: any) => {
  ctx.reply("Please upload logo Image.")
});

uploadScene.on("photo", async (ctx) => {
  const photo = ctx.message.photo;
  if (photo) {
    console.log(photo)
  }
});

uploadScene.on("document", async (ctx) => {
  console.log("document");
  const document = ctx.message.document;
  // const _focusedGroupId = focusedGroupId;
  // const _focusedMedia = focusedMedia;
  console.log(document)

  // _uploadMedia(ctx, document, _focusedGroupId, _focusedMedia);
});