/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

export default new Command({
    name: `loadallcmds`,
    owner: true,
    category: "owner",
    description: `👀 | Load all slash commands for all guilds, or just one guild!`,
    options: [{ type: "STRING", name: "guildid", description: `👀 | A guild id`, required: false }],
    exampleUsage: `/loadallcmds [guildid]`,
    run: async ({ interaction, args, client }) => {
        const guildId = args.getString("guildid");
        const guild = client.guilds.cache.find((g) => g.id === guildId);
        if (!guild) {
            guild?.commands.set(client.commandArray)
        } else {
            client.application?.commands.set(client.commandArray)
        }

        interaction.reply({
            embeds: [new Embed({
                title: `Commands Loaded`,
                description: `Commands ${guild ? `for **${guild.name}** \`${guild.id}\` have been loaded` : "globally have been loaded"}`
            })]
        })
    }
})