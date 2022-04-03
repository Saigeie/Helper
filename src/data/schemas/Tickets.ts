import { Role, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export interface Ticket {
  guildId: string;
  id: string;
  channelId: string;
  owner: string;
  created: string;
  allowedUsers: Array<string>;
}

const schema = new Schema<Ticket>({
  guildId: { type: String },
  id: { type: String },
  channelId: { type: String },
  owner: { type: String },
  created: { type: String },
  allowedUsers: [{ type: String }],
});

export default model("Tickets", schema);
