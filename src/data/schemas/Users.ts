import { Guild, GuildMember, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export interface Crate {
  type: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Unobtainable";
  name: string;
  description: string;
  obtained: number;
  gifted?: boolean;
  id: string;
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

export interface UserExtended {
  username: string;
  discriminator: string;
  avatar_url: string;
}

export type UserExtendedType = {
  username: string;
  discriminator: string;
  avatar_url: string;
  token: string;
}
export interface User {
  userId: string;
  token: string;
  wallet: number;
  bank: number;
  bank_cap: number;
  crates: Array<Crate>;
  items: Array<Item>;
  guilds: Array<Guild>;
  userExtended: UserExtended
}


const schema = new Schema<User>({
  userId: { type: String },

  // Economy
  wallet: { type: Number, default: 50 },
  bank: { type: Number, default: 0 },
  bank_cap: { type: Number, default: 5000 },
  crates: [{ type: Object }],
  items: [{ type: Object }],

  // Dashboard Information
  guilds: [{ type: Object }],
  userExtended: { type: Object },
});

export default model("Users", schema);
