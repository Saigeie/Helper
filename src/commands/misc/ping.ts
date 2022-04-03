import { TextChannel } from "discord.js";
import { textFormatters } from "../../modules/format";
import { Command } from "../../structures/Command";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `ping`,
  type: "CHAT_INPUT",
  category: "misc",
  description: `🤍 | See the bots ping!`,
  exampleUsage: `/ping`,
  run: async ({ client, interaction }) => {
    interaction.reply({ content: `${client.ws.ping}ms!` });
  },
});