import { Guild, GuildMember, StageChannel, TextBasedChannel, TextChannel, VoiceChannel } from "discord.js";
import { formatPerm } from "../modules/format";

export default function (member: GuildMember, guild: Guild, channel: TextChannel | VoiceChannel | StageChannel) {
    return [
      { original: `<<user#id>>`, new: `${member.user.id}` },
      { original: `<<user#username>>`, new: `${member.user.username}` },
      { original: `<<user#tag>>`, new: `${member.user.tag}` },
      { original: `<<user#bot>>`, new: `${member.user.bot}` },
      { original: `<<user#mention>>`, new: `<@${member.user.id}>` },
      {
        original: `<<user#avatar>>`,
        new: `${member.user.displayAvatarURL({ dynamic: true, size: 1024 })}`,
      },
      {
        original: `<<user#created>>`,
        new: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F>`,
      },
      { original: `<<server#id>>`, new: `${guild.id}` },
      { original: `<<server#name>>`, new: `${guild.name}` },
      {
        original: `<<server#icon>>`,
        new: `${guild.iconURL({ dynamic: true, size: 1024 })}`,
      },
      { original: `<<server#membercount>>`, new: `${guild.memberCount}` },
      {
        original: `<<server#created>>`,
        new: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
      },
      { original: `<<channel#id>>`, new: `${channel.id}` },
      { original: `<<channel#name>>`, new: `${channel.name}` },
      {
        original: `<<channel#type>>`,
        new: `${formatPerm(`${channel.type}`).replace("Guild_", "")}`,
      },
      { original: `<<channel#position>>`, new: `${channel.position}` },
    ];
}

