const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeline")
    .setDescription("show timeline"),
  async execute(interaction) {
    await interaction.reply("no timeline")
  }
}
