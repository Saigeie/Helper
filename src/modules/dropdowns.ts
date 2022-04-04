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

/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

const Dropdowns = async (
  pages: Array<Page>,
  interaction: Extendedinteraction | ButtonInteraction | SelectMenuInteraction,
  client: Helper,
  editReply: boolean = false,
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
  if (editReply === true) {
    interaction
      .editReply({
        embeds: [pages[0].embed[0]],
        components: dropdowns,
      })
      .catch(() => {});
  } else {
    interaction
      .reply({
        embeds: [pages[0].embed[0]],
        ephemeral: true,
        components: dropdowns,
      })
      .catch((err) => { console.log(err)});
  }
  const collector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
    time: 15000,
  });
  let lastChoosenEmbed = pages[0].embed[0];
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
    }).catch(() => { })
    lastChoosenEmbed = embed
    
  });

  collector.on("end", (c, r) => {
    dropdowns.forEach((dropdown) => { 
      dropdown.components[0].setDisabled(true)
    })
    interaction
      .editReply({
        components: dropdowns,
        embeds: [lastChoosenEmbed],
      })
      .catch(() => {});
  })
};
export default Dropdowns;
