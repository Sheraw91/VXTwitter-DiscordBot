const Discord = require("discord.js")
require('dotenv').config()

const bot = new Discord.Client({ intents: 3276799 })

console.log(process.env.TOKEN)
bot.login(process.env.TOKEN)

const hasTwitterLink = (message) => {
  const regex_link = new RegExp(/(https?:\/\/(.+?\.)?twitter\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/, "igm")
  return regex_link.test(message)
}

const getLink = (message) => {
  return message.match(/\bhttps?:\/\/\S+/gi)
}

bot.on("ready", async () => {
  console.log(bot.user)
})

bot.on('messageCreate', async message => {
  if(!message.author.bot && hasTwitterLink(message.content)) {
    const link = getLink(message.content)
    const updatedLink = link[0].replace(/twitter/g, "vxtwitter")
    message.reply(updatedLink)
  }
})