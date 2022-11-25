module.exports = async (interaction, json) => {
  if (json.userId !== interaction.user.id) return

  interaction.message.delete()
}

