import {
  ColorResolvable,
  GuildMember,
  MessageEmbed,
  MessageEmbedFooter,
  MessageEmbedOptions,
} from "discord.js";
const colorObj = {
  red: "#FF2145",
  yellow: "e9c46a",
  orange: "e76f51",
  blue: "#0c63e7",
  green: "76c893",
};

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export class LogsEmbed {
  constructor(
    data?: MessageEmbedOptions,
    color?: "red" | "yellow" | "orange" | "blue" | "green",
    member?: GuildMember,
  ) {
    return new MessageEmbed({
      color: colorObj[color] as ColorResolvable,
      ...data,
      timestamp: Date.now(),
    });
  }
}
