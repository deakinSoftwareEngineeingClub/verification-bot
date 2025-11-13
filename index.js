import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

import {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  ButtonBuilder, ButtonStyle, ActionRowBuilder,
  ModalBuilder, TextInputBuilder, TextInputStyle,
  PermissionsBitField, PermissionFlagsBits, MessageFlags,
} from 'discord.js';

import config  from './config/config.json'  with { type: 'json' };

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


client.commands = new Collection(); 


const commandsRootDir = path.join(__dirname, 'commands');  // ensure this is correct
const commandFolders  = fs.readdirSync(commandsRootDir, { withFileTypes: true })
                          .filter(dirent => dirent.isDirectory())
                          .map(dirent => dirent.name);

for (const folder of commandFolders) {
	const commandsPath = path.join(commandsRootDir, folder);
	const commandFiles = fs.readdirSync(commandsPath)
							.filter(file => file.endsWith('.js'));  // adjust if .mjs
	for (const file of commandFiles) {
		const filePath   = path.join(commandsPath, file);
		const moduleURL  = pathToFileURL(filePath).href;
		const commandMod = await import(moduleURL);
		if ('data' in commandMod && 'execute' in commandMod) {
		client.commands.set(commandMod.data.name, commandMod);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});

client.login(config.token);