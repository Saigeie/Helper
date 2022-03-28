import textFormatterTerms from "../data/textFormatterTerms"
import { Guild, GuildMember, StageChannel, TextChannel, VoiceChannel } from "discord.js";

export const formatPerm = (string: string) => {
    const words = string.split("_")
    const ar = []
    words.forEach((word) => {ar.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())})
    return ar.join(" ")
}

export const textFormatters = (
  msg: string,
  member: GuildMember,
  guild: Guild,
  channel: TextChannel | VoiceChannel | StageChannel
) => {
    const ar = textFormatterTerms(member, guild, channel)
    const text = msg
    for (const value of ar) text.replace(new RegExp(value.original, "igm"), value.new)
    return text;
};