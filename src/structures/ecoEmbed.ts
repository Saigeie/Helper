import {
  CommandInteraction,
  GuildMember,
  MessageEmbed,
  MessageEmbedOptions,
} from "discord.js";
import { client } from "..";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

interface Options {
  footer?: string;
}
export class EcoEmbed {
  constructor(
    data?: MessageEmbedOptions,
    member?: GuildMember,
    options: Options = {}
  ) {
    return new MessageEmbed({
      color: client.config.colour,
        ...data,
      timestamp: Date.now(),
      footer: {
        text: `👛`,
      },
    });
  }
}
