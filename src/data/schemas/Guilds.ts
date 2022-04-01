import { Role, TextChannel } from "discord.js";
import { Schema, Document, model, Types } from "mongoose";

export interface DropdownRole {
  role_id: string; // used as label value `role-${role.id}` - can check if its a dropdown
  emoji: string;
}
export interface Dropdown {
  message_id: string;
  channel_id: string;
  roles: Array<DropdownRole>
}
export interface Guild {
  guildId: string;
  owner_key: string;
  premium: boolean;
  tickets_channel: string;
  tickets_message: string;
  tickets_default_name: string;
  tickets_support_role: string;
  tickets_category: string;
  tickets_logs_channel: string;
  dropdowns: Array<Dropdown>
}


const schema = new Schema<Guild>({
  guildId: { type: String },
  owner_key: { type: String },
  premium: { type: Boolean, default: false },

  tickets_channel: { type: String },
  tickets_message: {
    type: String,
    default: `✅ Thank you for creating a ticket <<user#mention>>! Please supply all needed information, Please do not ping staff or spam!`,
  },
  tickets_default_name: { type: String },
  tickets_support_role: { type: String },
  tickets_category: { type: String },
  tickets_logs_channel: { type: String },
  dropdowns: [{ type: Object }],
});

export default model("Guilds", schema);
