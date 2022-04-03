import { TextChannel, ThreadChannel } from "discord.js";
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

export default new Event(`threadDelete`, async (thread) => {
  const logsChannel = (await getLogsChannel(thread.guild)) as
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
            name: `🗑️ Thread deleted`,
          },
          thumbnail: { url: thread.guild.iconURL({ dynamic: true }) },
          fields: [{ name: `Name`, value: `${thread.name}` }],
          footer: { text: `Thread ID: ${thread.id}` },
        },
        "red"
      ),
    ],
  });
});
