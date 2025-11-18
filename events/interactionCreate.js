import { Events, MessageFlags } from 'discord.js';

export default {
	name: Events.InteractionCreate,
	async execute(interaction) {
		console.log("event file loaded")

		//command  handler
		if (interaction.isChatInputCommand()) {
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
			//stops processing further when it's a command
			return;
		}

		//modal submission handler
		if (interaction.isModalSubmit()) {
			const modal = interaction.client.modals.get(interaction.customId);
			if (!modal) {
				console.error(`No modal matching ${interaction.customId} was found.`);
				return;
			}

			try {
				await modal.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: 'There was an error while handling your submission!',
						flags: MessageFlags.Ephemeral
					});
				} else {
					await interaction.reply({
						content: 'There was an error while handling your submission!',
						flags: MessageFlags.Ephemeral
					});
				}
			}
			return;
		}

		if (interaction.isButton()) {
			const buttonHandler = interaction.client.buttons.get(interaction.customId);
			if (!buttonHandler) {
				console.error(`No modal matching ${interaction.customId} was found.`);
				return;
			}

			try {
				await buttonHandler.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: 'There was an error while handling your button!',
						flags: MessageFlags.Ephemeral
					});
				} else {
					await interaction.reply({
						content: 'There was an error while handling your button!',
						flags: MessageFlags.Ephemeral
					});
				}
			}
			return;
		}
	}
};