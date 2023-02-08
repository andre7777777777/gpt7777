import { Telegraf, Markup, Composer, Scenes } from 'telegraf';
import { session } from "grammy";
const bot = new Telegraf("6054756793:AAEashBYSZtSFLSBPxkHUQ6tbKzlWnQ9M6Q");
import { ChatGPTAPI } from 'chatgpt'

function initial() {
    return {
        req_text: ""

    };
}

bot.use(session({ initial }));


const api = new ChatGPTAPI({
    apiKey: "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"
})
const gpt_txt = new Composer()

const gpt_main = new Scenes.WizardScene('req_to_gpt', gpt_txt)


const stage = new Scenes.Stage([gpt_main])
bot.use(stage.middleware())


bot.command("start", async (ctx) => {
    await ctx.scene.leave()
    await ctx.sendMessage("меню:", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "ChatGPT",
                        callback_data: "enter_chatgpt"
                    }
                ],
                [
                    {
                        text: "Поддержка",
                        callback_data: "help"
                    },
                    {
                        text: "Информация",
                        callback_data: "info"
                    }
                ]
            ]
        }
    })
})


bot.action("main_menu", async (ctx) => {
    await ctx.scene.leave()
    await ctx.editMessageText("меню:", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "ChatGPT",
                        callback_data: "enter_chatgpt"
                    }
                ],
                [
                    {
                        text: "Поддержка",
                        callback_data: "help"
                    },
                    {
                        text: "Информация",
                        callback_data: "info"
                    }
                ]
            ]
        }
    })
})


bot.action("help", async (ctx) => {
    await ctx.editMessageText("⚡️ Поддержка:\n\nТвой ID: 5802356038\n\nПо всем вопросам связаными с ботом либо покупкой рекламы обращатся к @Alex7777k", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Назад",
                        callback_data: "main_menu"
                    }
                ]
            ]
        }
    })
})




bot.action("enter_chatgpt", async (ctx) => {
    await ctx.editMessageText("Введите текст:\n\nОбработка может занимать до 60 секунд, после ввода текста нужно подождать.", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Назад",
                        callback_data: "main_menu"
                    }
                ]
            ]
        }
    })
    await ctx.scene.enter("req_to_gpt")
})
gpt_txt.on("text", async (ctx) => {
    ctx.session.req_text = await api.sendMessage(ctx.message.text)
    await ctx.sendMessage(ctx.session.req_text)
})

bot.action("info", async (ctx) => {
    await ctx.editMessageText("@gpt_easy_bot - это абсолютно бесплатный бот со встроеным исскуственным интелектом ChatGPT\n\nБот может практически все\n- Создавать скрипты.\n- Отвечает на любой вопрос.\n- Поможет решить школьные примеры/задачки.\n- Придумывает истории.\n- Переводит текст.\n- И это только часть его умений.\n\nChatGPT не просто копирует ответ из Википедии, а анализирует и структурирует ответ, чтобы он был удобен для чтения и восприятия, а так же максимально релевантен вопросу.\n\nМы предаставляем доступ к ChatGPT абсолютно бесплатно!\n\n*ChatGPT - Запрещена в России и в ряде других стран, автор не имеет отношения к компании OpenAI, и не имеет отношения к ChatGPT, бот создан исключительно в ознакомительных целях", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Назад",
                        callback_data: "main_menu"
                    }
                ]
            ]
        }
    })
})


bot.launch();