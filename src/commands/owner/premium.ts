import ClientData from "../../data/schemas/ClientData";
import Guilds from "../../data/schemas/Guilds";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `premium`,
  description: `👀 | Add/Remove a premium guild`,
  exampleUsage: `/premium [guildId] [value]`,
  category: "owner",
  owner: true,
  options: [
    {
      type: "STRING",
      name: `guildid`,
      description: `👀 | A Guild ID`,
      required: true,
    },
    {
      type: "BOOLEAN",
      name: `value`,
      description: `👀 | true or false`,
      required: true,
    },
  ],
  run: async ({ client, interaction, args }) => {
    const guildId = args.getString("guildid");
    const value = args.getBoolean("value");
    const guild = client.guilds.cache.find((g) => g.id === guildId);
    if (!guild)
      return interaction.reply({
        ephemeral: true,
        embeds: [
          new Embed({
            title: `No Guild Found`,
            description: `Could not find a guild with the id of \`${guildId}\``,
          }),
        ],
      });

    const guildSettings = await Guilds.findOne({ guildId: guild.id });
    if (!guildSettings)
      return interaction.reply({
        ephemeral: true,
        embeds: [
          new Embed({
            title: `No Guild Data Found`,
            description: `Could not find any guild data with the guild id of \`${guildId}\``,
          }),
        ],
      });

    await Guilds.findOneAndUpdate(
      { guildId: guild.id },
      {
        premium: value,
      }
    );

    interaction.reply({
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Premium Updated`,
          description: `**${guild.name}**'s premium status has now been set to \`${value}\``,
        }),
      ],
    });

    if (value === true) {
      guild.members.cache.find(m => m.id === client.user.id).setNickname(`Helper | 👑`).catch(() => {})

      await ClientData.findOneAndUpdate(
        { key: `${process.env.SERVER_KEY}` },
        {
          $push: {
            premiumGuilds: guild.id,
          },
        }
      );
    } else if (value === false) {
      let index;
      const clientData = await ClientData.findOne({
        key: `${process.env.SERVER_KEY}`,
      });
      clientData.premiumGuilds.forEach((guild) => {
        if (guild === guildId)
          return (index = clientData.premiumGuilds.indexOf(guild));
      });
      clientData.premiumGuilds.splice(index, 1);
      clientData.save();
    }
  },
});