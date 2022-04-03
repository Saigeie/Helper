import { Message, NonThreadGuildBasedChannel } from "discord.js";
import { Command } from "../../structures/Command";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `emit`,
  description: `👀 | Emit an event!`,
  exampleUsage: `/emit`,
  category: "owner",
  owner: true,
  run: async ({ client, interaction }) => {},
});