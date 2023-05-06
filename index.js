require('dotenv').config()
const fs = require("fs");
const Eris = require("eris-additions")(require("eris"));
const readyEvent = require("./events/ready.js");

const client = new Eris.CommandClient(process.env.TOKEN, {intents: [
  "guilds",
  "guildMessages",
  "guildMessageReactions",
  "guildVoiceStates",
  "directMessages",
  "directMessageReactions",
  Eris.Constants.Intents.GUILD_PRESENCES,
  Eris.Constants.Intents.GUILD_MEMBERS,
  Eris.Constants.Intents.DIRECT_MESSAGE_TYPING
]}, {owner: "YOUR NAME",
defaultHelpCommand: false, ignoreBots: true, ignoreSelf: true})

readyEvent(client);

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const fileCommands = require(`./commands/${file}`);
  if (Array.isArray(fileCommands)) {
    commands.push(...fileCommands);
  } else {
    commands.push(fileCommands);
  }
}

let command_prefix = "."; //replace with your prefix

client.on("messageCreate", async (message) => {
  const prefix = command_prefix;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command = commands.find(c => {
    if (c.name === commandName) return true;
    if (c.aliases && c.aliases.includes(commandName)) return true;
    return false;
  });

  if (!command) return;

  try {
    await command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    await message.channel.createMessage("An error occurred while executing the command.");
  }
});

client.connect();