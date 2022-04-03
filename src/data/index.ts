import chalk from "chalk";
import { connect } from "mongoose";
import { client } from "..";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default function () {
  connect(`${process.env.MONGODB}`)
    .then(() => {
      client.logger.info(`${chalk.redBright(`Connected to database`)}`);
    })
    .catch((err) => {
      client.logger.info(`${chalk.redBright(`Failed to connect to database`)}`);
      console.log(err);
    });
}
