import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from "discord.js";
import { User } from "../data/schemas/Users";
import { Helper } from "../structures/Client";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export interface Extendedinteraction extends CommandInteraction {
  member: GuildMember;
}

interface RunOptions {
  client: Helper;
  interaction: Extendedinteraction;
  args: CommandInteractionOptionResolver;
  userData: User;
}

type RunFun = (options: RunOptions) => any;

export type CommandTypes = {
  owner?: boolean;
  exampleUsage: string;
  premium?: boolean;
  botPermissions?: PermissionResolvable[];
  userPermissions?: PermissionResolvable[];
  category: string;
  run: RunFun;
} & ChatInputApplicationCommandData;
