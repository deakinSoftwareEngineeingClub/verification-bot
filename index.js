import fs from 'node:fs';
import path from 'node:path';
import url from 'url';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL  } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);	

console.log(__filename);

import {
  Client,
  Collection,
  GatewayIntentBits,
} from 'discord.js';

import config  from './config/config.json'  with { type: 'json' };

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,	
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent
] });




client.commands = new Collection();
const commandFoldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandFoldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(commandFoldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		//esm does not support windows paths only when in urls
		//e.g file:///c:/Folder/test.txt
		const fileUrl = pathToFileURL(filePath);
		const command = await import(fileUrl.href);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.modals = new Collection();
const modalFoldersPath = path.join(__dirname, 'modals');
const modalFiles = fs.readdirSync(modalFoldersPath).filter((file) => file.endsWith('.js'));


for (const file of modalFiles) {
	const filePath = path.join(modalFoldersPath, file);
	const fileUrl = pathToFileURL(filePath);
	const modal = await import(fileUrl.href);
	if ('customId' in modal && 'execute' in modal) {
		client.modals.set(modal.customId, modal);
	} else {
		console.warn(`[WARNING] Modal at ${filePath} missing "customId" or "execute".`);
	}
}






const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const fileUrl = pathToFileURL(filePath);
	const { default: event } = await import(fileUrl.href);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}




client.login(config.token); 