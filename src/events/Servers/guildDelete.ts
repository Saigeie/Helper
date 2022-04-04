import chalk from "chalk";
import { client } from "../..";
import Guilds from "../../data/schemas/Guilds";
import { Event } from "../../structures/Event";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Event(`guildDelete`, async (guild) => {
    client.logger.info(
      `Left server, ${chalk.redBright(`${guild.name}`)} | ${chalk.redBright(
        `${guild.id}`
      )} `
    );
    await Guilds.findOneAndRemove({ guildId: guild.id })
})