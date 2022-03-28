import { GuildMember, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

export interface Crate {
  type: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Unobtainable";
  name: string;
  description: string;
  obtained: number;
  gifted?: boolean;
}

export interface Item {
  type: "Fishing" | "Mining" | "Utility";
  rarity:
    | "Common"
    | "Uncommon"
    | "Rare"
    | "Epic"
    | "Legendary"
    | "Unobtainable";
  name: string;
  description: string;
  obtained: number;
  gifted?: boolean;
  durabilty?: number;
}

export interface User extends Document {
  userId: string;
  bronze: number;
  silver: number;
  gold: number;
  crates: Array<Crate>;
  items: Array<Item>;
}

export interface Moderation {
  moderator: string;
  date: number;
  reason: string;
  channel: string;
  id: string
}

const schema = new Schema({
  userId: { type: String },

  // Economy
  bronze: { type: Number },
  silver: { type: Number },
  gold: { type: Number },
  crates: { type: Array },
  items: { type: Array },
});

export default model("Users", schema);
