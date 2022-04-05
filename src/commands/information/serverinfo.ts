import Guilds from "../../data/schemas/Guilds";
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
  name: `server`,
  description: `🤍 | See information on the current server!`,
  exampleUsage: `/server [category]`,
  category: "information",
  options: [
    {
      type: "SUB_COMMAND",
      name: `links`,
      description: `🤍 | See your desinated links on the helper.solar website!`,
    },
    {
      type: "SUB_COMMAND",
      name: "info",
      description: `🤍 | See your server information`,
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
    },
  ],
  run: async ({ interaction, args }) => {
    const subcommand = args.getSubcommand();
    if (subcommand === "links") {
      interaction.reply({
        embeds: [
          new Embed({
            title: `Current Server Links`,
            description: ` > **Dashboard**: https://helper.solar/dashboard/${interaction.guild.id}\n > **Premium:** https://helper.solar/premium\n > **Bot Inivte:** https://helper.solar/invite?referal=${interaction.guild.id}`,
          }),
        ],
      });
    } else if (subcommand === "info") {
      const category = args.getString("category");
      const guildSettings = await Guilds.findOne({guildId: interaction.guild.id })
      if (!category) {
        interaction.reply({
          components: [LinkButtons],
          embeds: [
            new Embed(
              {
                author: {
                  name: `${interaction.guild.name}`,
                  iconURL: interaction.guild.iconURL({ dynamic: true }),
                },
                description: `${guildSettings.premium === true ? `👑 **Premium Server:**\n> This server is part of our **[premium](https://helper.solar/discord)** system!\n > Meaning they gain access to limited features and beta features too!` : ""}`,
                fields: [
                  { name: `ID`, value: `\`${interaction.guild.id}\`` },
                  {
                    name: `Owner`,
                    value: `<@${interaction.guild.ownerId}> \`${interaction.guild.ownerId}\``,
                  },
                  {
                    name: `Members`,
                    value: `• **Bots:** ${
                      interaction.guild.members.cache.filter((f) => f.user.bot)
                        .size
                    }\n• **Users:** ${
                      interaction.guild.members.cache.filter((f) => !f.user.bot)
                        .size
                    }`,
                  },
                  {
                    name: `Channels`,
                    value: `• **Text:** ${
                      interaction.guild.channels.cache.filter(
                        (c) => c.type === "GUILD_TEXT"
                      ).size
                    }\n• **Voice:** ${
                      interaction.guild.channels.cache.filter(
                        (c) => c.type === "GUILD_VOICE"
                      ).size
                    }\n• **Categories:** ${
                      interaction.guild.channels.cache.filter(
                        (c) => c.type === "GUILD_CATEGORY"
                      ).size
                    }\n• **Stages:** ${
                      interaction.guild.channels.cache.filter(
                        (c) => c.type === "GUILD_STAGE_VOICE"
                      ).size
                    }`,
                  },
                ],
              },
              interaction.member
            ),
          ],
        });
      } else {
        let embed;
        switch (category) {
          case "members":
            embed = new Embed(
              {
                author: {
                  name: `Members - ${interaction.guild.name}`,
                  url: interaction.guild.iconURL({ dynamic: true }),
                },
                fields: [
                  {
                    name: `Bots`,
                    value: `${
                      interaction.guild.members.cache.filter((f) => f.user.bot)
                        .size
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
              },
              interaction.member
            );
          case "channels":
            embed = new Embed(
              {
                author: {
                  name: `Channels - ${interaction.guild.name}`,
                  url: interaction.guild.iconURL({ dynamic: true }),
                },
                fields: [
                  {
                    name: `Text`,
                    value: `${
                      interaction.guild.channels.cache.filter(
                        (c) => c.type === "GUILD_TEXT"
                      ).size
                    }`,
                    inline: true,
                  },
                  {
                    name: `Voice`,
                    value: `${
                      interaction.guild.channels.cache.filter(
                        (c) => c.type === "GUILD_VOICE"
                      ).size
                    }`,
                    inline: true,
                  },
                  {
                    name: `Stages`,
                    value: `${
                      interaction.guild.channels.cache.filter(
                        (c) => c.type === "GUILD_STAGE_VOICE"
                      ).size
                    }`,
                    inline: true,
                  },
                  {
                    name: `Categories`,
                    value: `${
                      interaction.guild.channels.cache.filter(
                        (c) => c.type === "GUILD_CATEGORY"
                      ).size
                    }`,
                    inline: true,
                  },
                ],
              },
              interaction.member
            );
          case "roles":
            const roles = [];
            interaction.guild.roles.cache
              .filter((f) => f.id !== interaction.guild.id)
              .forEach((role) => {
                roles.push(`<@&${role.id}>`);
              });
            embed = new Embed(
              {
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
                    value: `${
                      roles.length > 0 ? `${roles.join(", ")}` : "None"
                    }`,
                    inline: true,
                  },
                ],
              },
              interaction.member
            );
        }

        interaction.reply({ embeds: [embed] });
      }
    }
  },
});
