import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import { CommandTypes } from "../types/CommandTypes";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../types/Client";
import { Event } from "./Event";
import Connect from "../data";
import { Config } from "../types/Config";
import Logger from "../modules/logger";
import chalk from "chalk";
const globPromise = promisify(glob);

export class Helper extends Client {
  commands: Collection<string, CommandTypes> = new Collection();
  logger = Logger;
  config: Config = {
    colour: [248, 200, 220],
    ignored_requirement_servers: ["955201445748170882", "938840989303464007"],
    invisable_charater: "\u200B",
  };
  constructor() {
    super({ intents: 32767 });
  }

  start() {
    this.registerModules();
    this.login(process.env.TOKEN);
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      this.logger.info(`${chalk.redBright(`Commands Registered:`)} ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      this.logger.info(
        `${chalk.redBright(`Registering global commands`)}`
      );
    }
  }

  async registerModules() {
    Connect();
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../commands/**/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath) => {
      const command: CommandTypes = await this.importFile(filePath);
      if (!command.name) return;
      this.commands.set(command.name, command);
      slashCommands.push(command);
    });

    this.on("ready", () => {
      this.registerCommands({
        guildId: `${process.env.GUILD_ID}`,
        commands: slashCommands,
      });
    });
    const eventFiles = await globPromise(
      `${__dirname}/../events/**/*{.ts,.js}`
    );
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
