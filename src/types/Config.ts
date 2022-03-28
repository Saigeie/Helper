import { ColorResolvable } from "discord.js";

export interface Config {
  colour: ColorResolvable;
  owner_ids?: Array<string>;
  ignored_requirement_servers?: Array<string>;
  invisable_charater: string
}