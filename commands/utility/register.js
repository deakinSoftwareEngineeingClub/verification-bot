import { SlashCommandBuilder } from 'discord.js';


async function findExistingVerifyMessage(channel) {
    const messages = await channel.messages.fetch({ limit: 50 });
    return messages.find(m =>
        m.author.id === channel.client.user.id &&
        m.components?.some(row => row.components?.some(comp => comp.customId === VERIFY_BUTTON_ID)),
        console.log(m)
    );
}



export const data = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Modal for verifying club members.')



export async function execute(interaction) {
		const VERIFY_BUTTON_ID = 'verify:start';
}


