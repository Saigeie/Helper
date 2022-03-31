import chalk from "chalk";
import { connect } from "mongoose";
import { client } from "..";

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
