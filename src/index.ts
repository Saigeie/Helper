import { config } from "dotenv";
import { Helper } from "./structures/Client";
config();
export const client = new Helper();
client.start();