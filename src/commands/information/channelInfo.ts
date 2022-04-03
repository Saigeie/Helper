import { GuildChannel, TextChannel } from "discord.js";
import { formatPerm } from "../../modules/format";
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
  name: `channelinfo`,
  description: `🤍 | See information on a channel!`,
  exampleUsage: `/channelinfo [channel]`,
  category: "information",
  options: [
    {
      type: "CHANNEL",
      name: "channel",
      description: `🤍 | The channel!`,
      required: false,
    },
  ],
  run: async ({ interaction, args }) => {
    const channel = (args.getChannel("channel") ||
      interaction.channel) as GuildChannel;
    const parent = interaction.guild.channels.cache.find(
      (f) => f.id === channel.parentId
    )
      ? `\`${
          interaction.guild.channels.cache.find(
            (f) => f.id === channel.parentId
          ).name
        }\``
      : "None";
    interaction.reply({
      components: [LinkButtons],
      embeds: [
        new Embed(
          {
            title: `Channel Information`,
            fields: [
              {
                name: `Name & ID`,
                value: `${channel.name} \`${channel.id}\``,
              },
              {
                name: `Extra Information`,
                value: `• Type: \`${formatPerm(`${channel.type}`).replace(
                  "Guild ",
                  ""
                )}\`${
                  channel.type !== "GUILD_CATEGORY"
                    ? `\n• Category: ${parent}`
                    : ""
                }\n• Position: ${channel.position}\n• Created: <t:${Math.floor(
                  channel.createdTimestamp / 1000
                )}:F>`,
              },
            ],
          },
          interaction.member
        ),
      ],
    });
  },
});