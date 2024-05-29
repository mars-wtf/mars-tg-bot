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
exports.passwordScene = void 0;
const telegraf_1 = require("telegraf");
// Create a new scene
exports.passwordScene = new telegraf_1.Scenes.BaseScene('passwordScene');
// Handle the password input
exports.passwordScene.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the user's input
    const password = ctx.message.text;
    const next = ctx.scene.state.next;
    // delete password
    yield ctx.deleteMessage(ctx.message.message_id);
    // Return the result
    return ctx.scene.enter(next, { password: password });
}));
// Handle the password prompt
exports.passwordScene.enter((ctx) => {
    ctx.reply('Please enter your password', {
        reply_markup: {
            force_reply: true,
            input_field_placeholder: 'Enter password',
        }
    });
});
//# sourceMappingURL=passwordScene.js.map