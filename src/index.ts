import { config } from "dotenv";
import { Helper } from "./structures/Client";
import Dashboard from "./dashboard/server"
config();
export const client = new Helper();
client.start();
// Dashboard()