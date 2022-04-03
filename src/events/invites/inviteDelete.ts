/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

import { Guild } from "discord.js";
import getLogsChannel from "../../modules/getLogsChannel";
import { Event } from "../../structures/Event";
import { LogsEmbed } from "../../structures/LogEmbed";

export default new Event(`inviteDelete`, async (invite) => {
    const logsChannel = await getLogsChannel(invite.guild as Guild);
    if (!logsChannel) return;
    logsChannel.send({
      embeds: [
        new LogsEmbed(
          {
            thumbnail: { url: invite.guild.iconURL({ dynamic: true }) },
            author: {
              name: `🗑️ Invite Deleted`,
            },
            fields: [
              {
                name: `Code & Link`,
                value: `**Code**: \`${invite.code}\`\n**URL**: **[${invite.url}**](${invite.url})`,
              },
            ],
          },
          "blue"
        ),
      ],
    });
})