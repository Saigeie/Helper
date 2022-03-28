import { TextChannel } from "discord.js";
import { textFormatters } from "../../modules/format";
import { Command } from "../../structures/Command";


export default new Command({
    name: `ping`,
    type: "CHAT_INPUT",
    description: `🤍 | See the bots ping!`, 
    exampleUsage: `/ping`,
    run: async ({ client, interaction }) => {
            interaction.reply({content: `${client.ws.ping}ms!`})
    }
})