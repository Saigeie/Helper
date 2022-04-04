import { Event } from "../../structures/Event";
import { client } from "../../"
import chalk from "chalk";
import ClientData from "../../data/schemas/ClientData";
import { ActivitiesOptions } from "discord.js";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Event(`ready`, async () => {
    client.logger.info(
      `${chalk.redBright(chalk.bold(`${client.user.tag}`))} is now online`
    );
    client.logger.info(
      `${chalk.greenBright.bold(`Guilds`)}: ${client.guilds.cache.size}`
    );
    client.logger.info(
      `${chalk.greenBright.bold(`Users`)}: ${client.users.cache.size}`
  );
  const clientdata = await ClientData.findOne({ key: `${process.env.SERVER_KEY}`})
  if (!clientdata) await ClientData.create({ key: `${process.env.SERVER_KEY}` });
  client.user.setActivity({ name: `/help | helper.solar`, type: "PLAYING" })
})