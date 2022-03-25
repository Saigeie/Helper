require("dotenv").config()
import { DCTinder } from "./structures/Client";
export const client = new DCTinder();
client.start()