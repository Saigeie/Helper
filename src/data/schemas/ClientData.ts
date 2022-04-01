import { Role, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

export interface Guild {
    key: string;
    premiumGuilds: Array<string>
    commandsRan: number;
}

const schema = new Schema<Guild>({
    key: { type: String, default: `${process.env.SERVER_KEY}` },
    premiumGuilds: [{ type: String }],
    commandsRan: { type: Number, default: 0}
});

export default model("ClientData", schema);
