import { Command } from "../../structures/Command";


export default new Command({
    name: `ping`,
    type: "CHAT_INPUT",
    description: `🤍 | See the bots ping!`, 
    run: async ({ client, interaction }) => {
            interaction.reply({content: `${client.ws.ping}ms!`})
    }
})