import { Telegraf, Scenes, session, Context } from 'telegraf';

// Create a new scene
export const passwordScene = new Scenes.BaseScene<Context>('passwordScene');

// Handle the password input
passwordScene.on('text', async (ctx: any) => {
    // Get the user's input
    const password: string = ctx.message.text;
    const next: string = ctx.scene.state.next;
    // delete password
    await ctx.deleteMessage(ctx.message.message_id);
    // Return the result
    return ctx.scene.enter(next, { password: password });
});

// Handle the password prompt
passwordScene.enter((ctx: any) => {
    ctx.reply(
        'Please enter your password',
        {
            reply_markup: {
                force_reply: true,
                input_field_placeholder: 'Enter password',
            }
        }
    );
});