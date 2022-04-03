import { TextChannel } from "discord.js";
import Tickets from "../../data/schemas/Tickets";
import { formatPerm } from "../../modules/format";
import getLogsChannel from "../../modules/getLogsChannel";
import { Event } from "../../structures/Event";
import { LogsEmbed } from "../../structures/LogEmbed";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Event(`channelDelete`, async (channel) => {
  if (channel.type !== "GUILD_TEXT") return;
  const ticketCheck = await Tickets.findOne({ channelId: channel.id });
  if (ticketCheck) {
    await Tickets.findOneAndRemove({ channelId: channel.id });
  }

  const logsChannel = (await getLogsChannel(channel.guild)) as
    | undefined
    | null
    | false
    | TextChannel;
  if (!logsChannel) return;
  logsChannel.send({
    embeds: [
      new LogsEmbed(
        {
          author: {
            name: `🗑️ ${formatPerm(channel.type).replace(
              "Guild",
              ""
            )} channel deleted`,
          },
          thumbnail: { url: channel.guild.iconURL({ dynamic: true }) },
          fields: [{ name: `Name`, value: `${channel.name}` }],
          footer: { text: `Channel ID: ${channel.id}` },
        },
        "red"
      ),
    ],
  });
});
