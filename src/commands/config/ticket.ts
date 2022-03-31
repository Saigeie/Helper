import { SelectMenuInteraction } from "discord.js";
import { Setup, UpdateCategory, UpdateChannel, UpdateDefaultName, UpdateLogsChannel, UpdateMessage, UpdateSupportRole } from "../../modules/Configuration/Tickets";
import { Command } from "../../structures/Command";

export default new Command({
  name: `ticket`,
  description: `🔨 | Setup/Manage the ticket config!`,
  exampleUsage: `/ticket [config]`,
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
