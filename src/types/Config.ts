import { ColorResolvable } from "discord.js";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export interface Emojis {
  reply: string;
  right_skip: string;
  left_skip: string;
  right_arrow: string;
  left_arrow: string;
  coin: string;
}
export interface Config {
  colour: ColorResolvable;
  owner_ids: Array<string>;
  ignored_requirement_servers?: Array<string>;
  invisable_charater: string;
  emojis: Emojis;
}
