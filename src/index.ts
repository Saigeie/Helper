
/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

import { config } from "dotenv";
import { Helper } from "./structures/Client";
import Dashboard from "./dashboard/server"
import chalk from "chalk";
config();
export const client = new Helper();
client.start();
// Dashboard()

console.log(
  chalk.redBright(`
 ██░ ██ ▓█████  ██▓     ██▓███  ▓█████  ██▀███  
▓██░ ██▒▓█   ▀ ▓██▒    ▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒
▒██▀▀██░▒███   ▒██░    ▓██░ ██▓▒▒███   ▓██ ░▄█ ▒
░▓█ ░██ ▒▓█  ▄ ▒██░    ▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄  
░▓█▒░██▓░▒████▒░██████▒▒██▒ ░  ░░▒████▒░██▓ ▒██▒
 ▒ ░░▒░▒░░ ▒░ ░░ ▒░▓  ░▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░
 ▒ ░▒░ ░ ░ ░  ░░ ░ ▒  ░░▒ ░      ░ ░  ░  ░▒ ░ ▒░
 ░  ░░ ░   ░     ░ ░   ░░          ░     ░░   ░ 
 ░  ░  ░   ░  ░    ░  ░            ░  ░   ░     
                                                
`)
);