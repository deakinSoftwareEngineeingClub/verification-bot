
import  {Events  }  from 'discord.js';
import { buildVerificationModal } from '../modals/verificationModal.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if(interaction.isButton()) {
            console.log("verification button pressed")
            if(interaction.customId == 'verification_button') {
                const modal = buildVerificationModal()
                interaction.showModal(modal)
            } 
        }    
    }
    
};