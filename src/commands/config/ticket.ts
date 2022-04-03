import { SelectMenuInteraction } from "discord.js";
import { Setup, UpdateCategory, UpdateChannel, UpdateDefaultName, UpdateLogsChannel, UpdateMessage, UpdateSupportRole } from "../../modules/Configuration/Tickets";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `ticket`,
  description: `🔨 | Setup/Manage the ticket config!`,
  exampleUsage: `/ticket [config]`,
  category: "config",
  userPermissions: ["ADMINISTRATOR"],
  options: [
    {
      type: "STRING",
      name: `config`,
      description: `🔨 | The config setting`,
      required: false,
      choices: [
        { name: `setup`, value: `setup` },
        { name: `support role`, value: `role` },
        { name: `channel`, value: `channel` },
        { name: `default channel name`, value: `channel_name` },
        { name: `prompt message`, value: `message` },
        { name: `logs channel`, value: `logs_channel` },
        { name: `ticket category`, value: `category` },
      ],
    },
  ],
  run: async ({ interaction, args, client }) => {
    const config = args.getString("config") || "none";
    switch (config) {
      case "none":
        interaction.reply({
          embeds: [
            new Embed(
              {
                title: `Helper's Ticket System`,
                description: ` > Please select a category to begin the setup!\n > Options can be viewed by doing \`/ticket\` then choose the category!`,
              },
              interaction.member
            ),
          ],
        });
        break;
      case "setup":
        Setup(client, interaction, args);
        break;
      case "role":
        //@ts-ignore
        UpdateSupportRole(client, interaction as SelectMenuInteraction, args);
        break;
      case "channel":
        //@ts-ignore
        UpdateChannel(client, interaction as SelectMenuInteraction, args);
        break;
      case "channel_name":
        //@ts-ignore
        UpdateDefaultName(client, interaction as SelectMenuInteraction, args);
        break;
      case "message":
        //@ts-ignore
        UpdateMessage(client, interaction as SelectMenuInteraction, args);
        break;
      case "logs_channel":
        //@ts-ignore
        UpdateLogsChannel(client, interaction as SelectMenuInteraction, args);
        break;
      case "category":
        //@ts-ignore
        UpdateCategory(client, interaction as SelectMenuInteraction, args);
        break;
    }
  },
});
