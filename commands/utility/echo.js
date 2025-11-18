import { SlashCommandBuilder } from  'discord.js';

export const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption((option) =>  option.setName('input').setDescription('The input to echo back'));

export async function execute(interaction) {
	const echo = interaction.options.getString('input');

	await interaction.reply(echo);
}
