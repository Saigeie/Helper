import { Guild, TextChannel } from "discord.js";
import Guilds from "../data/schemas/Guilds";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default  async function (guild: Guild) {
     const guildSettings = await Guilds.findOne({ guildId: guild.id });
     if (!guildSettings.logging_channel) return;
     const loggingChannel = await guild.channels.cache.find(
       (c) => c.id === guildSettings.logging_channel
     );
    if (!loggingChannel) return;
    return loggingChannel as TextChannel
}