import Guilds from "../../data/schemas/Guilds";
import { Event } from "../../structures/Event";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Event(`guildDelete`, async (guild) => {
    await Guilds.findOneAndRemove({ guildId: guild.id })
})