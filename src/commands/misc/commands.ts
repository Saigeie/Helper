import { MessageEmbed } from "discord.js";
import { formatPerm } from "../../modules/format";
import Pagination, { Page } from "../../modules/pagination";
import RandomTip from "../../modules/randomTip";
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
  name: `commands`,
  description: `🤍 | See all of helper's Commands`,
  exampleUsage: "/commands [command]",
  category: "misc",
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
     const randomTip = await RandomTip(client);
    if (!certainCommand) {
      const categories = []
      const pages: Array<Page> = []
      client.commands.forEach((cmd) => {
        if (categories.includes(cmd.category)) return;
        categories.push(cmd.category)
      })
      const dropdownCategories = [];
      categories.forEach((cata: string) => {
        dropdownCategories.push({ label: `${formatPerm(cata)}`, value: `${cata.toLowerCase()}`})
        const commands = client.commands.filter(c => c.category === cata)
        const commandArray = []
        commands.forEach((cmd) => commandArray.push(cmd))
        const cmdPages = []
        const pageNums = Math.round(commandArray.length / 2)
        for (let i = 0; i < commandArray.length; i++) {
          cmdPages.push(
            new Embed(
              {
                description: `${randomTip}\n\n${commandArray
                  .splice(0, pageNums)
                  .map(
                    (cmd) =>
                      `[**${cmd.name}**](https://helper.solar)\n${
                        client.config.emojis.reply
                      } ${cmd.description.replace(
                        `${cmd.description.split(" | ")[0]} | `,
                        ""
                      )}`
                  )
                  .join("\n")}`,
              },
              interaction.member, { footer: `Page Number: ${i} | Helper 🤍` }
            )
          );
        }
        pages.push({ id: cata, embed: cmdPages })
      })
      Pagination(pages, interaction, client, dropdownCategories);
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
