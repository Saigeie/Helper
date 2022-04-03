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

export default new Event(`voiceStateUpdate`, async (oldState, newState) => {
  const logsChannel = await getLogsChannel(oldState.guild || newState.guild);
  if (!logsChannel) return;
  const member = oldState.member || newState.member;
  if (member.user.bot) return;
  if (oldState.channelId === null) {
    // Joined
    logsChannel.send({
      embeds: [
        new LogsEmbed(
          {
            author: {
              name: `${member.user.tag}`,
              url: member.user.displayAvatarURL({ dynamic: true }),
            },
            thumbnail: { url: member.user.displayAvatarURL({ dynamic: true }) },
            description: `📥 <@${member.user.id}> joined voice channel \`${newState.channel.name}\``,
          },
          "blue"
        ),
      ],
    });
  } else if (newState.channelId === null) {
    // Left
    logsChannel.send({
      embeds: [
        new LogsEmbed(
          {
            author: {
              name: `${member.user.tag}`,
              url: member.user.displayAvatarURL({ dynamic: true }),
            },
            thumbnail: { url: member.user.displayAvatarURL({ dynamic: true }) },
            description: `📤 <@${member.user.id}> joined voice channel \`${oldState.channel.name}\``,
          },
          "blue"
        ),
      ],
    });
  } else if (newState.channelId !== null && oldState.channelId !== null) {
    // Moved
    logsChannel.send({
      embeds: [
        new LogsEmbed(
          {
            author: {
              name: `${member.user.tag}`,
              url: member.user.displayAvatarURL({ dynamic: true }),
            },
            thumbnail: { url: member.user.displayAvatarURL({ dynamic: true }) },
            description: `📥 <@${member.user.id}> move voice channel \`${oldState.channel.name}\` -> \`${newState.channel.name}\``,
          },
          "blue"
        ),
      ],
    });
  }
});
