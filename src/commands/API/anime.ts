/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import axios from "axios";
import Dropdowns from "../../modules/dropdowns";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

export default new Command({
  name: `anime`,
  description: `💻 | Gain information about a certain anime!`,
  exampleUsage: `/anime [query]`,
  options: [
    {
      type: "STRING",
      name: "query",
      description: `💻 | Anime title!`,
      required: true,
    },
  ],
  category: "api",
  run: async ({ interaction, args, client }) => {
    const query = args.getString("query");
    axios
      .get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`)
      .then((res) => {
        const data = res.data.data[0].attributes;
        if (!data) {
          return interaction.reply({
            ephemeral: true,
            embeds: [
              new Embed({
                description: `I could not find an anime under the name of \`${query}\``,
              }),
            ],
          });
        }
        const titles = [];
        Object.keys(data.titles).forEach((lang) => {
          if (!lang) return;
          if (lang.startsWith("en") && lang !== "en") return;
          titles.push(data.titles[lang]);
        });
        const pages = [];
        const cataTitles = [];
        res.data.data.forEach((anime) => {
          const data = anime.attributes;
          cataTitles.push({
            label: `${data.titles.en || "No english name found"} - ${
              data.titles.ja_jp ? data.titles.ja_jp : "No japanese name found"
            }`,
            value: `${anime.id}`,
          });
          pages.push({
            id: `${anime.id}`,
            embed: [
              new Embed({
                title: `${
                  data.titles.en || data.titles.ja_jp
                    ? data.titles.ja_jp
                    : "No name found"
                }`,
                url: `https://kitsu.io/anime/${anime.id}`,
                description: `${data.synopsis.slice(0, 1024)}`,
                fields: [
                  {
                    name: `Abbreviated Titles`,
                    value: ` - ${titles.join("\n - ")}`,
                    inline: true,
                  },
                  {
                    name: `Adverage Rating`,
                    value: `${data.averageRating}`,
                    inline: true,
                  },
                  {
                    name: `\u200B`,
                    value: `\u200B`,
                    inline: true,
                  },
                  {
                    name: `Age Rating`,
                    value: `${data.ageRating}`,
                    inline: true,
                  },
                  { name: `NSFW`, value: `${data.nsfw}`, inline: true },
                  {
                    name: `\u200B`,
                    value: `\u200B`,
                    inline: true,
                  },
                ],
                image: { url: `${data.posterImage.large}` },
              }),
            ],
          });
        });
        Dropdowns(pages, interaction, client, false, cataTitles, "animes");
      });
  },
});
