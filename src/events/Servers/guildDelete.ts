import Guilds from "../../data/schemas/Guilds";
import { Event } from "../../structures/Event";

export default new Event(`guildDelete`, async (guild) => {
    await Guilds.findOneAndRemove({ guildId: guild.id })
})