import { MessageActionRow, MessageButton } from "discord.js";

export default new MessageActionRow().addComponents([
  new MessageButton()
    .setStyle("LINK")
    .setLabel("Support")
    .setURL("https://discord.gg/MzAhUmcEbE"),
  new MessageButton()
    .setStyle("LINK")
    .setLabel("Wiki")
    .setURL("https://github.com/Saigeie/Helper/wiki"),
  new MessageButton()
    .setStyle("LINK")
    .setLabel("Source")
    .setURL("https://github.com/Saigeie/Helper"),
]);