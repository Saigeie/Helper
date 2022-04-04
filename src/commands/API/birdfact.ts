/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import { Command } from "../../structures/Command";
import axios from "axios";
import { Embed } from "../../structures/Embed";
export default new Command({
  name: `birdfact`,
  description: `💻 | Gain an random bird fact!`,
  exampleUsage: `/birdfact`,
  category: `api`,
  run: async ({ interaction }) => {
    axios.get(`https://some-random-api.ml/facts/bird`).then((res) => {
      const { fact } = res.data;
      if (!fact)
        return interaction.reply({
          ephemeral: true,
          embeds: [new Embed({ description: `Failed to retreve a fact!` })],
        });
      interaction.reply({
        embeds: [
          new Embed({
            description: fact,
          }),
        ],
      });
    });
  },
});
