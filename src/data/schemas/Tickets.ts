import { Role, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

export interface Ticket extends Document {
    guildId: string;
    id: string;
    channelId: string;
    owner: string;
    created: string
}

const schema = new Schema<Ticket>({
  guildId: { type: String },
  id: { type: String },
  channelId: { type: String },
  owner: { type: String },
  created: { type: String },
});

export default model("Tickets", schema);
