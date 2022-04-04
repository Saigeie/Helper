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
  name: `dogfact`,
  description: `💻 | Gain an random dog fact!`,
  exampleUsage: `/dogfact`,
  category: `api`,
  run: async ({ interaction }) => {
    interface Response {
      fact: string;
    }
    axios.get(`https://some-random-api.ml/facts/dog`).then((res) => {
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
