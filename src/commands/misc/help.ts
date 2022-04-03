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
  name: `help`,
  description: `🤍 | Gain information about helper!`,
  exampleUsage: `/help`,
  category: "misc",
  run: async ({ interaction }) => {
    interaction.reply({
      ephemeral: true,
      components: [LinkButtons],
      embeds: [
        new Embed(
          {
            title: `Helper's Panel`,
            description: `\n > You can find out how to setup helper at the [wiki](https://github.com/Saigeie/Helper/wiki)\n > Commands can be viewed by doing \`/commands\`\n\n*The support server can be found below*\nWe hope you enjoy using helper.solar!`,
          },
          interaction.member
        ),
      ],
    });
  },
});