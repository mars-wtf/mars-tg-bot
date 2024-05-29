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
exports.uploadScene = void 0;
const telegraf_1 = require("telegraf");
exports.uploadScene = new telegraf_1.Scenes.BaseScene("uploadScene");
exports.uploadScene.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.reply("Please upload logo Image.");
}));
exports.uploadScene.on("photo", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const photo = ctx.message.photo;
    if (photo) {
        console.log(photo);
    }
}));
exports.uploadScene.on("document", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("document");
    const document = ctx.message.document;
    // const _focusedGroupId = focusedGroupId;
    // const _focusedMedia = focusedMedia;
    console.log(document);
    // _uploadMedia(ctx, document, _focusedGroupId, _focusedMedia);
}));
//# sourceMappingURL=uploadScene.js.map