import { Event } from "../../structures/Event";
import { client } from "../../"
import chalk from "chalk";
export default new Event(`ready`, () => {
    client.logger.info(
      `${chalk.redBright(chalk.bold(`${client.user.tag}`))} is now online`
    );
    client.logger.info(
      `${chalk.greenBright.bold(`Guilds`)}: ${client.guilds.cache.size}`
    );
    client.logger.info(
      `${chalk.greenBright.bold(`Users`)}: ${client.users.cache.size}`
    );
})