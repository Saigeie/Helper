import { GuildMember, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

export interface Moderation {
  moderator: string;
  date: number;
  reason: string;
  channel: string;
  id: string;
}

const schema = new Schema({
  userId: { type: String },
  guildId: { type: String },
  warns: { type: Array },
  mutes: { type: Array },
  bans: { type: Array },
});

export default model("UserModeration", schema);
