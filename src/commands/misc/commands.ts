import { formatPerm } from "../../modules/format";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";
import LinkButtons from "../../structures/LinkButtons";

export default new Command({
  name: `commands`,
  description: `🤍 | See all of helper's Commands`,
  exampleUsage: "/commands [command]",
  options: [
    {
      name: `command`,
      type: "STRING",
      description: `🤍 | A command`,
      required: false,
    },
  ],
  run: async ({ interaction, client, args}) => {
    const certainCommand = args.getString("command")
    if(!certainCommand) {
         const commands = [];
         client.commands.forEach((command) => {
           commands.push(`\`${command.name}\``);
         });

      interaction.reply({
        ephemeral: true,
        components: [LinkButtons],
        embeds: [
          new Embed(
            {
              title: `Helper's Commands`,
              description: `> Make Sure to use \`/commands [command]\` to see information on a certain command!\n\n${commands.join(
                " "
              )}`,
            },
            interaction.member
          ),
        ],
      });
    } else {
      const command = client.commands.get(certainCommand)
      if(!command) return interaction.reply({ embeds: [ new Embed({ description: `\`${certainCommand}\` doesnt appear to be a command, Please try again!`})]})
      const permissions = [];
      if (command.userPermissions) { command.userPermissions.forEach((perm) => { permissions.push(formatPerm(`${perm}`));})}
      interaction.reply({
        ephemeral: true,
        components: [LinkButtons],
        embeds: [
          new Embed(
            {
              title: `Helper's Command Info`,
              description: `\`[]\` - Optional | \`<>\` - Required`,
              fields: [
                {
                  name: `Description:`,
                  value: `*${command.description.replace("🤍 | ", "")}*`,
                },
                {
                  name: `Extra Information`,
                  value: `• Example Usage: \`${
                    command.exampleUsage
                  }\`\n• Owner: \`${
                    command.owner ? `${command.owner}` : "false"
                  }\`\n• Permissions: ${
                    command.userPermissions
                      ? `\`${permissions.join("`, `")}\``
                      : "None"
                  }`,
                },
              ],
            },
            interaction.member
          ),
        ],
      });
    }
  },
});
