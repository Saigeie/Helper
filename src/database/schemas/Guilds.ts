import { Role, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

export interface Guild extends Document {
    guildId: string;
    owner_key: string;
}

export interface Verification {
  channelId: TextChannel | string;
  promtMessage: string;
  role: Role | string;
}

const schema = new Schema({
    guildId: { type: String },
    owner_key: { type: String },

    verification: { type: Object }
});

export default model("Guilds", schema);
