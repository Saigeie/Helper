import { Message } from "discord.js";

export const messageDelete = (msg: Message, time: number = 100) => {
        setTimeout(() => {
          msg.delete().catch(() => {});
        }, time);
}