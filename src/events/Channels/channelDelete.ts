import Tickets from "../../data/schemas/Tickets";
import { Event } from "../../structures/Event";

export default new Event(`channelDelete`, async (channel) => {
    if (channel.type !== "GUILD_TEXT") return;
    const ticketCheck = await Tickets.findOne({ channelId: channel.id })
    if (ticketCheck) {
        await Tickets.findOneAndRemove({ channelId: channel.id })
    }
})