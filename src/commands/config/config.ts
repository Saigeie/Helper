import Guilds from "../../data/schemas/Guilds";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";
import LinkButtons from "../../structures/LinkButtons";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `config`,
  userPermissions: ["ADMINISTRATOR"],
  exampleUsage: "/config [category]",
  description: `🔨 | View the saved config for a certain category`,
  category: "config",
  options: [
    {
      name: `category`,
      description: `🔨 | The config category`,
      required: false,
      type: "STRING",
      choices: [
        { name: `tickets`, value: `tickets` },
        { name: `logging`, value: `logging` },
      ],
    },
  ],
  run: async ({ interaction, args }) => {
    const category = args.getString("category") || "none";
    const guildConfig = await Guilds.findOne({
      guildId: interaction.guild.id,
    });
    switch (category) {
      case "none":
        interaction.reply({
          ephemeral: true,
          components: [LinkButtons],
          embeds: [
            new Embed(
              {
                title: `Helper's Config`,
                description: ` > Please select a category to view its config!\n > Options can be viewed by doing \`/config\` then choose the category!`,
              },
              interaction.member
            ),
          ],
        });
        break;
      case "tickets":
        if (!guildConfig.tickets_channel) {
          return interaction.reply({
            ephemeral: true,
            components: [LinkButtons],
            embeds: [
              new Embed(
                {
                  title: `Ticket Config`,
                  description: `Ticket configuration for guild: \`${interaction.guild.id}\`\n\n\`\`\`\nNo configuration found!\n\`\`\``,
                },
                interaction.member
              ),
            ],
          });
        }
        interaction.reply({
          ephemeral: true,
          components: [LinkButtons],
          embeds: [
            new Embed(
              {
                title: `Ticket Config`,
                description: `Ticket configuration for guild: \`${
                  interaction.guild.id
                }\`\n\n\`\`\`json\nChannel: "${
                  guildConfig.tickets_channel || "None"
                }"\nCategory: "${
                  guildConfig.tickets_category || "None"
                }"\nSupport Role: "${
                  guildConfig.tickets_support_role || "None"
                }"\nDefault Name: "${
                  guildConfig.tickets_default_name || "None"
                }"\nLogs Channel: "${
                  guildConfig.tickets_logs_channel || "None"
                }"\nMessage: "${
                  guildConfig.tickets_message || "None"
                }"\n\`\`\``,
              },
              interaction.member
            ),
          ],
        });
        break;
      case "logging":
        if (!guildConfig.logging_channel) {
          return interaction.reply({
            ephemeral: true,
            components: [LinkButtons],
            embeds: [
              new Embed(
                {
                  title: `Logging Config`,
                  description: `Logging configuration for guild: \`${interaction.guild.id}\`\n\n\`\`\`\nNo configuration found!\n\`\`\``,
                },
                interaction.member
              ),
            ],
          });
        }
        interaction.reply({
          ephemeral: true,
          components: [LinkButtons],
          embeds: [
            new Embed(
              {
                title: `Logging Config`,
                description: `Logging configuration for guild: \`${
                  interaction.guild.id
                }\`\n\n\`\`\`json\nChannel: "${
                  guildConfig.logging_channel || "None"
                }"\nEvents: [\n"${guildConfig.logging_events.join(
                  '",\n"'
                )}"\n]\n\`\`\``,
              },
              interaction.member
            ),
          ],
        });
        break;
    }
  },
});
