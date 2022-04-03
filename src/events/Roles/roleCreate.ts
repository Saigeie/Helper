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

export default new Event(`roleCreate`, async (role) => {
  const logsChannel = (await getLogsChannel(role.guild)) as
    | undefined
    | null
    | false
    | TextChannel;
  if (!logsChannel) return;
  if (role.managed) return;
  logsChannel.send({
    embeds: [
      new LogsEmbed(
        {
          author: {
            name: `📥 Role created`,
          },
          thumbnail: { url: role.guild.iconURL({ dynamic: true }) },
          fields: [{ name: `Name`, value: `${role.name}` }],
          footer: { text: `Role ID: ${role.id}` },
        },
        "blue"
      ),
    ],
  });
});
