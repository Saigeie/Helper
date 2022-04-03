import getLogsChannel from "../../modules/getLogsChannel";
import { Event } from "../../structures/Event";
import { LogsEmbed } from "../../structures/LogEmbed";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Event(`guildMemberRemove`, async (member) => {
  const logsChannel = await getLogsChannel(member.guild);
  if (!logsChannel) return;
  logsChannel.send({
    embeds: [
      new LogsEmbed(
        {
          author: {
            name: `${member.user.tag}`,
            icon_url: member.user.displayAvatarURL({ dynamic: true }),
          },
          description: `📥 <@${member.user.id}> left the server`,
          thumbnail: { url: member.user.displayAvatarURL({ dynamic: true }) },
          footer: { text: `ID: ${member.user.id} ` },
        },
        "red"
      ),
    ],
  });
});
