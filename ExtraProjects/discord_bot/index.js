const {
  Client,
  GatewayIntentBits,
  Partials,
  Routes,
  Collection,
} = require("discord.js");
require("dotenv").config();
//modules
// const slash = require("./slash_command");
const { REST } = require("@discordjs/rest");
const fs = require("fs");
//-----------------------------------------------------------------------------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    // GatewayIntentBits.GuildBans,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    "GuildMembers",
    "Guilds",
    "GuildMessages",
  ],
  partials: [Partials.Channel],
});

//bot ready
client.on("ready", () => {
  console.log("AIC_bot is ready");
  // slash(); //active slash_command
  client.user.setPresence({
    activities: [{ name: "AIC_bot" }],
    status: "online",
  });
});
//--------------------------------------------------------------------------------
// welcome message
client.on("guildMemberAdd", (member) => {
  console.log("someone joined");
  const channelID = "1010540667769983068";
  const rulesID = "1010540667769983070";

  console.log(member);

  const message = `welcome ${member} to AIC, Please read the rules in ${member.guild.channels.cache.get(
    rulesID
  )}`;
  const channel = member.guild.channels.cache.get(channelID);

  channel.send(message);
});
//reply to hi message
client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "hi") {
    if (message.author.bot) {
      return;
    } else message.reply(`hi ${message.author}`);
  }
});
//--------------------------------------------------------------------------------
//slash_command
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
//--------------------------------------------------------------------------------

client.login(process.env.token);
