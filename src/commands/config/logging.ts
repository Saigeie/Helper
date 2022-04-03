import { Events, Setup, UpdateChannel } from "../../modules/Configuration/Logging";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `logging`,
  description: `🔨 | Setup/Manage your logging configuration`,
  exampleUsage: `/logging [category]`,
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
        { name: `events`, value: `events` },
        { name: `channel`, value: `channel` },
      ],
    },
  ],
  run: async ({ interaction, client, args }) => {
    const config = args.getString("config") || "none";
    switch (config) {
      case "none":
        interaction.reply({
          embeds: [
            new Embed({
              title: `Helper's Logging System`,
              description: `Allow you to log certain events that happen in your discord server! Please select one of the options when running \`/logging\` to get started!`,
            }),
          ],
        });
        break;
      case "setup":
        Setup(client, interaction, args);
        break;
      case "events":
        Events(client, interaction, args);
        break;
      case "channel":
        UpdateChannel(client, interaction);
        break;
    }
  },
});