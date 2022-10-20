const { Client, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { hasTwitterLink, getVxTwitterLink } = require('./functions/regex')
const deleteMessage = require('./interactions/buttons/deleteMessage')
require('dotenv').config()

const bot = new Client({ intents: 3276799 })

bot.on('ready', async () => {
  console.log(bot.user)
})

bot.on('messageCreate', async message => {
  if (!hasTwitterLink(message.content) || message.author.bot) return

  const rep = await getVxTwitterLink(message.content).catch(console.error)
  if (rep.video <= 0) return

  const deleteButton = new ActionRowBuilder()
    .addComponents([
      new ButtonBuilder()
        .setCustomId(JSON.stringify({
          id: 'deleteMessage',
          userId: message.author.id
        }))
        .setLabel('Delete')
        .setStyle(4)
        .setDisabled(false)
    ])

  message.reply({
    content: `> <@!${message.author.id}>\n${rep.message}`,
    components: [deleteButton]
  })
    .then(m => message.delete())
    .catch(console.error)
})

bot.on('interactionCreate', async interaction => {
  if (interaction.isButton())
    interaction
      .deferUpdate()
      .then(() => {
        const json = JSON.parse(interaction.customId)
        if (json.id.normalize() === 'deleteMessage'.normalize()) deleteMessage(interaction, json).catch(console.error)
      })
      .catch(console.error)
})

bot.login(process.env.TOKEN)
