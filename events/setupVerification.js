import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';

const verificationChannel = '1429277241749012566'

console.log("verification file found")


export default {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        console.log("verification started")
        console.log(message.content)
        if (message.content === '.setup' && message.channelId === verificationChannel) {
            console.log("verification something")
            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("DarkNavy")
                        .setDescription("Sets Up Verification Process.")
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel("Verify Here!")
                                .setCustomId("verification_button")
                                .setStyle(ButtonStyle.Success)
                        )
                ]
            });
        }
    }
};