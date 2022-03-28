import Guilds from "../../data/schemas/Guilds";
import { Event } from "../../structures/Event";

export default new Event(`messageCreate`, async (message) => {
    if (message.author.bot) return;
    const guild = await Guilds.findOne({ guildId: message.guild.id })
    if(!guild) await Guilds.create({ guildId: message.guild.id });
})