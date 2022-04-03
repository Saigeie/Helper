import { GuildMember } from "discord.js";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";
import LinkButtons from "../../structures/LinkButtons";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `avatar`,
  description: `🤍 | Get a user's avatar!`,
  exampleUsage: `/avatar [member]`,
  category: "information",
  options: [
    {
      type: "USER",
      name: `member`,
      description: `✨ | The user!`,
      required: false,
    },
  ],
  run: async ({ interaction, args }) => {
    const member =
      (args.getMember(`member`) as GuildMember) || interaction.member;

    interaction.reply({
      components: [LinkButtons],
      embeds: [
        new Embed(
          {
            title: `${member.user.tag}'s Avatar!`,
            image: {
              url: member.user.displayAvatarURL({
                dynamic: true,
                size: 1024,
              }),
            },
          },
          interaction.member
        ),
      ],
    });
  },
});
