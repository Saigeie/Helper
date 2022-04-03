import { Message } from "discord.js";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export const messageDelete = (msg: Message, time: number = 100) => {
        setTimeout(() => {
          msg.delete().catch(() => {});
        }, time);
}