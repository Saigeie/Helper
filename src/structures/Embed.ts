import {
  CommandInteraction,
  GuildMember,
  MessageEmbed,
  MessageEmbedOptions,
} from "discord.js";
import { client } from "..";

export class Embed {
  constructor(
    data?: MessageEmbedOptions,
    member?: GuildMember,
    footer: string = "Helper 🤍"
  ) {
    return new MessageEmbed({
      color: client.config.colour,
      ...data,
      footer: {
        text: `${member ? `${member.user.tag} | ` : ""}${footer}`,
        iconURL: client.user.displayAvatarURL({
          dynamic: false,
          size: 128,
          format: "png",
        }),
      },
    });
  }
}

// Example
/*
    new Embed({
        title: `Hello World`,
        ! Other Normal Embed Options ( https://discord.js.org/#/docs/discord.js/stable/typedef/MessageEmbedOptions )
    }, interaction),
*/
