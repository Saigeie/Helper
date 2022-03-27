import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

export default new Command({
  name: `serverinfo`,
  description: `🤍 | See information on the current server!`,
  options: [
    {
      type: "STRING",
      name: `category`,
      description: `🤍 | A certain information category`,
      required: false,
      choices: [
        { name: `roles`, value: `roles` },
        { name: `channels`, value: "channels" },
        { name: `members`, value: `members` },
      ],
    },
  ],
  run: async ({ interaction, args }) => {
    const category = args.getString("category");
    if (!category) {
      interaction.reply({
        embeds: [
          new Embed({
            author: {
              name: `${interaction.guild.name}`,
              url: interaction.guild.iconURL({ dynamic: true }),
            },
            fields: [
              { name: `ID`, value: `\`${interaction.guild.id}\`` },
              {
                name: `Owner`,
                value: `<@${interaction.guild.ownerId}> \`${interaction.guild.ownerId}\``,
              },
              { name: `Members`, value: `a` },
              { name: `Channels`, value: `a` },
            ],
          }),
        ],
      });
    } else {
      let embed;
      switch (category) {
        case "members":
          embed = new Embed({
            author: {
              name: `Members - ${interaction.guild.name}`,
              url: interaction.guild.iconURL({ dynamic: true }),
            },
            fields: [
              {
                name: `Bots`,
                value: `${
                  interaction.guild.members.cache.filter((f) => f.user.bot).size
                }`,
                inline: true,
              },
              {
                name: `Users`,
                value: `${
                  interaction.guild.members.cache.filter((f) => !f.user.bot)
                    .size
                }`,
                inline: true,
              },
              {
                name: `Admins`,
                value: `${
                  interaction.guild.members.cache.filter(
                    (f) => !f.user.bot && f.permissions.has("ADMINISTRATOR")
                  ).size
                }`,
                inline: true,
              },
              {
                name: `Owner`,
                value: `<@${interaction.guild.ownerId}> \`${interaction.guild.ownerId}\``,
                inline: true,
              },
            ],
          });
          case "channels":
              embed = new Embed({
                author: {
                  name: `Channels - ${interaction.guild.name}`,
                  url: interaction.guild.iconURL({ dynamic: true }),
                },
                fields: [
                  {
                    name: `Text`,
                    value: `${interaction.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size}`,
                    inline: true,
                  },
                  {
                    name: `Voice`,
                    value: `${interaction.guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size}`,
                    inline: true,
                  },
                  {
                    name: `Stages`,
                    value: `${interaction.guild.channels.cache.filter(c => c.type === "GUILD_STAGE_VOICE").size}`,
                    inline: true,
                  },
                  {
                    name: `Categories`,
                    value: `${interaction.guild.channels.cache.filter(c => c.type === "GUILD_CATEGORY").size}`,
                    inline: true,
                  },
                ],
              });
          case "roles":
              const roles = []
               interaction.guild.roles.cache
                 .filter((f) => f.id !== interaction.guild.id)
                 .forEach((role) => { roles.push(`<@&${role.id}>`)});
              embed = new Embed({
                author: {
                  name: `Roles - ${interaction.guild.name}`,
                  url: interaction.guild.iconURL({ dynamic: true }),
                },
                fields: [
                  {
                    name: `Bot`,
                    value: `${
                      interaction.guild.roles.cache.filter(
                        (c) => c.managed === true
                      ).size
                    }`,
                    inline: true,
                  },
                  {
                    name: `User`,
                    value: `${
                      interaction.guild.roles.cache.filter(
                        (c) => c.managed === false
                      ).size
                    }`,
                    inline: true,
                  },
                  {
                    name: `Admin`,
                    value: `${
                      interaction.guild.roles.cache.filter((c) =>
                        c.permissions.has("ADMINISTRATOR")
                      ).size
                    }`,
                    inline: true,
                  },
                  {
                    name: `All [${roles.length}]`,
                    value: `${roles.length > 0 ? `${roles.join(", ")}` : "None"}`,
                    inline: true,
                  },
                ],
              });
        }
        
        interaction.reply({embeds: [embed]})
    }
  },
});
