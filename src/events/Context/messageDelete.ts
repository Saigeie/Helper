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

export default new Event(`messageDelete`, async (message) => {
    const logsChannel = await getLogsChannel(message.guild);
    if (!logsChannel) return;
    logsChannel.send({
        embeds: [new LogsEmbed({
            author: {
                name: `${message.author.tag}`,
                icon_url: message.author.displayAvatarURL({ dynamic: true })
            },
            description: `<@${message.author.id}>'s message was deleted`,
            fields: [{ name: `Content`, value: `\`\`\`\n${message.content.slice(0, 1024)}\n\`\`\` `}]
        }, "blue")]
    })
})