import {
  ButtonInteraction,
  MessageActionRow,
  MessageSelectMenu,
  SelectMenuInteraction,
} from "discord.js";
import { Helper } from "../structures/Client";
import { Embed } from "../structures/Embed";
import { Extendedinteraction } from "../types/CommandTypes";
import { Page, CategoryOptions } from "./pagination";

const Dropdowns = async (
  pages: Array<Page>,
  interaction: Extendedinteraction | ButtonInteraction | SelectMenuInteraction,
  client: Helper,
  categorys?: Array<CategoryOptions>,
  extraId?: string
) => {
  let dropdowns = [];
  for (let i = 0; i <= categorys.length; i++) {
      dropdowns.push(
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .addOptions(categorys.splice(0, 24))
          .setCustomId(`dropdown_${extraId || "asfasfad"}${i}`)
          .setPlaceholder("Choose an option below"),
      ])
      );

    }

  interaction.reply({
    embeds: [pages[0].embed[0]],
    ephemeral: true,
    components: dropdowns,
  });
  const collector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
  });
  collector.on("collect", async (i) => {
    const value = i.values[0];
    let embed;
    pages.forEach((page) => {
      if (page.id === value) {
        embed = page.embed[0];
      }
    });
    await i.deferUpdate();
    interaction.editReply({
      embeds: [embed],
      components: dropdowns,
    });
  });
};
export default Dropdowns;
