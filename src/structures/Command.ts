import { CommandTypes } from "../types/CommandTypes";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export class Command {
    constructor(commandOptions: CommandTypes) {
        Object.assign(this, commandOptions)
    }
}