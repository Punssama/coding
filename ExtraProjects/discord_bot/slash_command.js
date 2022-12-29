function slash() {
  require("dotenv").config();
  const { REST } = require("@discordjs/rest");
  const { Routes, Client, Intents, Collection } = require("discord.js");
  const fs = require("fs");
  const client = new Client({
    intents: ["Guilds", "GuildMessages"],
  });

  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  const commands = [];

  client.commands = new Collection();

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  client.once("ready", () => {
    const CLIENT_ID = "1011114068687466586";
    const rest = new REST({
      version: "9",
    }).setToken(process.env.token);
    (async () => {
      try {
        if (process.env.ENV === "production") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log("Successfully registered commands");
        } else {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
            {
              body: commands,
            }
          );
          console.log("Successfully registered command");
        }
      } catch (error) {
        if (error) console.error(error);
      }
    })();
  });
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      if (error) console.error(error);

      await interaction.reply({
        content: "An error occurred while while executing that command!",
        ephemeral: true,
      });
    }
  });

  client.login(process.env.token);
}
module.exports = slash;
