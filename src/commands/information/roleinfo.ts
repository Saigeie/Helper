import { formatPerm } from "../../modules/format";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";
import LinkButtons from "../../structures/LinkButtons";

export default new Command({
    name: `roleinfo`,
    description: `🤍 | Gain information about a role!`,
    exampleUsage: `/role <role>`,
    options: [{name: "role", type: "ROLE", description: `🤍 | The role`, required: true}],
    run: async ({ interaction, args }) => {
        const role = args.getRole("role")
        const guildRole = interaction.guild.roles.cache.find(f => f.id === role.id)
        const permissions = [];
        if (guildRole.permissions.toArray().length > 0) { 
            const everyoneRole = interaction.guild.roles.cache.find(f => f.id === interaction.guild.id)
            guildRole.permissions.toArray().forEach((perm) => {
                if (everyoneRole.permissions.has(perm)) return;
                permissions.push(formatPerm(`${perm}`));
            })
      }
        interaction.reply({
          components: [LinkButtons],
          embeds: [
            new Embed({
              title: `Role Informaiton`,
              fields: [
                { name: `Name & ID`, value: `${role.name} \`${role.id}\`` },
                {
                  name: `Extra Information`,
                  value: `• Hoisted: \`${role.hoist}\`\n• Color: \`${guildRole.hexColor}\`\n• Position: \`${guildRole.position}\`\n• Bot Role: \`${guildRole.managed}\``,
                },
                {
                  name: `Unique Permissions [${permissions.length}]`,
                  value: `${
                    permissions.length > 0
                      ? `${permissions.join(", ")}`
                      : "None"
                  }`,
                },
              ],
            }, interaction.member),
          ],
        });
    }
})