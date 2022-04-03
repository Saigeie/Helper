import { version } from "discord.js";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";
import duration from "humanize-duration";
import LinkButtons from "../../structures/LinkButtons";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `stats`,
  description: `🤍 | See Helper's statistics!`,
  exampleUsage: `/stats`,
  category: "information",
  run: async ({ interaction, client }) => {
    interaction.reply({
      components: [LinkButtons],
      embeds: [
        new Embed(
          {
            title: `Helper's Statistics`,
            fields: [
              {
                name: `Versions`,
                value: `**Node:** ${process.version}\n**D.JS:** v${version}`,
                inline: true,
              },
              {
                name: `\u200B`,
                value: `\u200B`,
                inline: true,
              },
              {
                name: `Statistics`,
                value: `• **Users:** ${
                  client.users.cache.filter((f) => !f.bot).size
                }\n• **Guilds:** ${client.guilds.cache.size}`,
                inline: true,
              },
              {
                name: `Uptime`,
                value: `${duration(client.uptime, { round: true })}`,
              },
            ],
          },
          interaction.member
        ),
      ],
    });
  },
});
