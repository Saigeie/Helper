import {
  ButtonInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  SelectMenuInteraction,
} from "discord.js";
import { Helper } from "../structures/Client";
import { Extendedinteraction } from "../types/CommandTypes";
export interface CategoryOptions {
  label: string;
  value: string;
}
export interface Page {
  id: string;
  embed: Array<MessageEmbed>;
}

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

const Pagination = async (
  pages: Array<Page>,
  interaction: Extendedinteraction | ButtonInteraction | SelectMenuInteraction,
  client: Helper,
  categorys?: Array<CategoryOptions>
) => {
  let dropdown;
  if (categorys) {
    dropdown = new MessageActionRow().addComponents([
      new MessageSelectMenu()
        .addOptions(categorys)
        .setCustomId("command_dropdown")
        .setPlaceholder("Choose a category"),
    ]);
  }
  const buttons = new MessageActionRow().addComponents([
    new MessageButton()
      .setEmoji(`${client.config.emojis.left_skip}`)
      .setStyle("PRIMARY")
      .setDisabled(true)
      .setCustomId("first_page"),
    new MessageButton()
      .setEmoji(`${client.config.emojis.left_arrow}`)
      .setStyle("PRIMARY")
      .setDisabled(true)
      .setCustomId("back_page"),
    new MessageButton()
      .setEmoji(`${client.config.emojis.right_arrow}`)
      .setStyle("PRIMARY")
      .setCustomId("forward_page"),
    new MessageButton()
      .setEmoji(`${client.config.emojis.right_skip}`)
      .setStyle("PRIMARY")
      .setCustomId("last_page"),
  ]);
  const firstPage = pages[0].embed[0];
  let currentCategory = pages[0].id;
  let currentpages: Array<MessageEmbed>;
  pages.map((p) => {
    if (p.id === currentCategory) {
      currentpages = p.embed;
    }
  });
  if (currentpages.length === 1) {
    buttons.components[0].setDisabled(true);
    buttons.components[1].setDisabled(true);
    buttons.components[2].setDisabled(true);
    buttons.components[3].setDisabled(true);
  }
  const components = []
  if (dropdown) { components.push(dropdown) }
  components.push(buttons)
  interaction.reply({
    ephemeral: true,
    components: components,
    embeds: [firstPage],
  });
  let pageOnEnd;
  const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
  collector.on("collect", async (i) => {
    if (i.user.id !== interaction.user.id || i.user.bot) return;
    let page = 0;
    await i.deferUpdate();
    if (i.isButton()) {
      switch (i.customId) {
        case "first_page":
          page = 0;
          break;
        case "last_page":
          page = currentpages.length;
          break;
        case "back_page":
          page = page > 0 ? --page : 0;
          break;
        case "forward_page":
          page =
            page + 1 < currentpages.length ? ++page : currentpages.length;
          break;
      }
      if (page === currentpages.length - 1) {
        buttons.components[0].setDisabled(false);
        buttons.components[1].setDisabled(false);
        buttons.components[2].setDisabled(true);
        buttons.components[3].setDisabled(true);
      }
      if (page === 0) {
        buttons.components[0].setDisabled(true);
        buttons.components[1].setDisabled(true);
        buttons.components[2].setDisabled(false);
        buttons.components[3].setDisabled(false);
      }
      interaction.editReply({
        components: components,
        embeds: [currentpages[page]],
      });
    }
    if (i.isSelectMenu()) {
      const value = i.values[0];
      pages.forEach((p) => {
        if (p.id === value) {
          currentCategory = value;
        }
      });
      pages.map((p) => {
        if (p.id === currentCategory) {
          currentpages = p.embed;
        }
      });
      page = 0;
      if (currentpages.length > 1) {
        buttons.components[0].setDisabled(true);
        buttons.components[1].setDisabled(true);
        buttons.components[2].setDisabled(false);
        buttons.components[3].setDisabled(false);
      }
      if (currentpages.length === 1) {
        buttons.components[0].setDisabled(true);
        buttons.components[1].setDisabled(true);
        buttons.components[2].setDisabled(true);
        buttons.components[3].setDisabled(true);
      }
      interaction.editReply({
        components: components,
        embeds: [currentpages[page]],
      });
      pageOnEnd = page
    }
  });

  collector.on("end", (c, r) => {
    buttons.components[0].setDisabled(true);
    buttons.components[1].setDisabled(true);
    buttons.components[2].setDisabled(true);
    buttons.components[3].setDisabled(true);
    interaction.editReply({
      components: components,
      embeds: [currentpages[pageOnEnd]],
    });
  })
};

export default Pagination;
