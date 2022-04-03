import Guilds from "../../data/schemas/Guilds";
import getLogsChannel from "../../modules/getLogsChannel";
import { Event } from "../../structures/Event";
import { LogsEmbed } from "../../structures/LogEmbed";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Event(`messageUpdate`, async (oldMessage, newMessage) => {
    if (newMessage.author.bot) return;
    const logsChannel = await getLogsChannel(newMessage.guild);
    if (!logsChannel) return;
    logsChannel.send({
      embeds: [
        new LogsEmbed(
          {
            author: {
              name: `${newMessage.author.tag}`,
              icon_url: newMessage.author.displayAvatarURL({ dynamic: true }),
            },
            description: `<@${newMessage.author.id}>'s message was updated`,
            fields: [
              {
                name: `Old Content`,
                value: `\`\`\`\n${oldMessage.content.slice(0, 1024)}\n\`\`\` `,
              },
              {
                name: `New Content`,
                value: `\`\`\`\n${newMessage.content.slice(0, 1024)}\n\`\`\` `,
              },
            ],
          },
          "blue"
        ),
      ],
    });
})