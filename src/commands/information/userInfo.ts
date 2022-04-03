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
  name: `userinfo`,
  description: `🤍 | Gain information on a member!`,
  exampleUsage: `/userinfo`,
  category: "information",
  options: [
    {
      type: "USER",
      name: "member",
      description: `🤍 | The member!`,
      required: false,
    },
  ],
  run: async ({ interaction, args }) => {
    const member =
      (args.getMember(`member`) as GuildMember) || interaction.member;
    const roles = [];
    member.roles.cache.forEach((role) => {
      if (role.id === interaction.guild.id) return;
      roles.push(`<@&${role.id}> `);
    });
    interaction.reply({
      components: [LinkButtons],
      embeds: [
        new Embed(
          {
            author: {
              name: `${member.user.tag}`,
              icon_url: `${member.user.displayAvatarURL({ dynamic: true })}`,
            },
            thumbnail: {
              url: member.user.displayAvatarURL({ dynamic: true }),
            },
            fields: [
              { name: `ID`, value: `\`${member.user.id}\``, inline: true },
              {
                name: `Nickname`,
                value: `${member.nickname ? `${member.nickname}` : "None"}`,
                inline: true,
              },
              {
                name: `Account Created`,
                value: `<t:${Math.floor(
                  member.user.createdTimestamp / 1000
                )}:F>`,
              },
              {
                name: `Join Date`,
                value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
              },
              {
                name: `Roles [${
                  member.roles.cache.filter(
                    (f) => f.id !== interaction.guild.id
                  ).size
                }]`,
                value: `${
                  member.roles.cache.filter(
                    (f) => f.id !== interaction.guild.id
                  ).size > 0
                    ? `${roles.join(", ")}`
                    : "None"
                }`,
              },
            ],
          },
          interaction.member
        ),
      ],
    });
  },
});
