import { MessageActionRow, MessageButton } from "discord.js";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new MessageActionRow().addComponents([
  new MessageButton()
    .setStyle("LINK")
    .setLabel("Support")
    .setURL("https://helper.solar/discord"),
  new MessageButton()
    .setStyle("LINK")
    .setLabel("Wiki")
    .setURL("https://github.com/Saigeie/Helper/wiki"),
  new MessageButton()
    .setStyle("LINK")
    .setLabel("Source")
    .setURL("https://github.com/Saigeie/Helper"),
]);