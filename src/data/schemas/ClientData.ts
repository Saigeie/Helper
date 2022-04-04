import { Role, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export interface Guild {
    key: string;
    premiumGuilds: Array<string>
    commandsRan: number;
    news: string;
}

const schema = new Schema<Guild>({
    key: { type: String, default: `${process.env.SERVER_KEY}` },
    premiumGuilds: [{ type: String }],
    commandsRan: { type: Number, default: 0 },
    news: { type: String, default: ``}
});

export default model("ClientData", schema);
