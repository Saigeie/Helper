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
  name: `urban`,
  description: `💻 | See the urban dictionary for a word!!`,
  exampleUsage: `/urban [query]`,
  options: [
    {
      type: "STRING",
      name: "query",
      description: `💻 | A word!`,
      required: true,
    },
  ],
  category: "api",
  run: async ({ interaction, args, client }) => {
    const query = args.getString("query");
    axios
      .get(`http://api.urbandictionary.com/v0/define?term=${query}`)
      .then(async (res) => {
        const pages = [];
        const categories = [];
        res.data.list.forEach((item) => {
          categories.push({
            label: `${item.example.slice(0, 45)} - ${item.author}`,
            value: `${item.defid}`,
          });
          pages.push({
            id: `${item.defid}`,
            embed: [
              new Embed({
                title: `${item.example}`,
                url: `${item.permalink}`,
                description: `${item.definition
                  .slice(0, 1024)
                  .replace("]", "")
                  .replace("[", "")}`,
                fields: [
                  {
                    name: `General`,
                    value: `**Author**: ${item.author}\n**Example**: ${item.example}\n**Rating**: 👍 ${item.thumbs_up} | 👎 ${item.thumbs_down}`,
                  },
                ],
              }),
            ],
          });
        });
        console.log(pages, categories);
        Dropdowns(pages, interaction, client, false, categories);
      });
  },
});
