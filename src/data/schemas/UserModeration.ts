import { GuildMember, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

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
