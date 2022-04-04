/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import yts from "yt-search";
import Dropdowns from "../../modules/dropdowns";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

export default new Command({
  name: `youtube`,
  description: `💻 | Get a response of videos for a search query`,
  exampleUsage: `/youtube [query]`,
  category: "api",
  options: [
    {
      type: "STRING",
      name: "query",
      description: `💻 | Your search query!`,
      required: true,
    },
  ],
  run: async ({ interaction, args, client }) => {
    const query = args.getString("query");
    const res = await yts(query);
    if (!res || res.videos.length < 1) {
      return interaction.reply({
        embeds: [
          new Embed({
            title: `No results!`,
            description: `I could not find any results for your query of \`${query}\``,
          }),
        ],
      });
    }

    const formattedVideos = [];
    const categories = [];
    res.videos.forEach((video) => {
      categories.push({
        label: `${video.title.slice(0, 50)} - ${video.author.name}`,
        value: `${video.videoId}`,
      });
      formattedVideos.push({
        id: `${video.videoId}`,
        embed: [
          new Embed({
            title: `${video.title}`,
            url: video.url,
            description: `Posted on ${video.timestamp} by [**${
              video.author.name
            }**](${video.url}) ${
              video.description.length > 100
                ? video.description.slice(0, 100) + "..."
                : video.description
            }`,
            image: { url: `${video.thumbnail}` },
          }),
        ],
      });
    });

    Dropdowns(formattedVideos, interaction, client, false, categories);
  },
});
