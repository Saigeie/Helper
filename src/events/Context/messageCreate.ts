import { client } from "../..";
import Guilds from "../../data/schemas/Guilds";
import getLogsChannel from "../../modules/getLogsChannel";
import { Embed } from "../../structures/Embed";
import { Event } from "../../structures/Event";
import LinkButtons from "../../structures/LinkButtons";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Event(`messageCreate`, async (message) => {
  if (message.author.bot) return;
  const guild = await Guilds.findOne({ guildId: message.guild.id });
  if (!guild) await Guilds.create({ guildId: message.guild.id });
  const mentionRegexp = RegExp(`^<@!?${client.user.id}>$`);
  if (message.content.match(mentionRegexp)) {
    message.reply({
      components: [LinkButtons],
      embeds: [
        new Embed(
          {
            title: `Helper's Panel`,
            description: `\n > You can find out how to setup helper at the [wiki](https://github.com/Saigeie/Helper/wiki)\n > Commands can be viewed by doing \`/commands\`\n\n*The support server can be found below*\nWe hope you enjoy using helper.solar!`,
          },
          message.member
        ),
      ],
    });
    
  }
});
