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
  const activites = [
    { name: "/help", type: "WATCHING" },
    { name: "https://helper.solar", type: "WATCHING" },
    { name: `${client.guilds.cache.size} Guilds`, type: "WATCHING" },
    { name: `${client.users.cache.size} Users!`, type: "WATCHING" },
    { name: `@helper`, type: "WATCHING" },
  ] as Array<ActivitiesOptions>
  
  client.user.setActivity(activites[0])
  client.user.setStatus("dnd")
  let activity = 1;
  setInterval(() => {
    if (activity > 5) activity = 0;
    client.user.setActivity(activites[activity])
    activity++
  }, 1000 * 60 * 5)
})