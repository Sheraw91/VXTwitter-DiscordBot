const Discord = require('discord.js')
const { hasTwitterLink, getVxTwitterLink } = require('./functions/regex')
require('dotenv').config()

const bot = new Discord.Client({ intents: 3276799 })

bot.on('ready', async () => {
  console.log(bot.user)
})

bot.on('messageCreate', async message => {
  if (!hasTwitterLink(message.content) || message.author.bot) return

  const rep = getVxTwitterLink(message.content)

  message.reply(`> <@!${message.author.id}>\n${rep}`)
    .then(m => message.delete())
})

bot.login(process.env.TOKEN)
