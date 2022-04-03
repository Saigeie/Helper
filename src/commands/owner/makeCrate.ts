import Users, { Crate } from "../../data/schemas/Users";
import genKey from "../../modules/genKey";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
  name: `makecrate`,
  description: `👀 | Make a crate and give it to someone`,
  owner: true,
  exampleUsage: `/makecrate [user] [type] [name] [description]`,
  category: "owner",
  options: [
    {
      type: "USER",
      name: "user",
      description: `👀 | The user you wish to give the crate too`,
      required: true,
    },
    {
      type: "STRING",
      name: "type",
      description: `👀 | The crate type`,
      required: true,
      choices: [
        { name: `Unobtainable`, value: "unobtainable" },
        { name: `Legendary`, value: "legendary" },
        { name: `Epic`, value: "epic" },
        { name: `Rare`, value: "rare" },
        { name: `Uncommon`, value: "uncommon" },
        { name: `Common`, value: "common" },
      ],
    },
    {
      type: "STRING",
      name: "name",
      description: `👀 | The crate name`,
      required: true,
    },
    {
      type: "STRING",
      name: "description",
      description: "👀 | The crate description",
      required: false,
    },
  ],
    run: async ({ interaction, args, client }) => {
        const userId = args.getUser("user");
        const type = args.getString("type") as "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Unobtainable";
        const name = args.getString("name");
        const description = args.getString("description") || "No crate description!"
      let userData = await Users.findOne({ userId: userId.id })
      if (!userData) await Users.create({ userId: userId.id });
      const id = genKey()
      const crate: Crate = {
        type: type,
        name: name,
        description: description,
        obtained: Date.now(),
        gifted: true,
        id: id
      }
      await Users.findOneAndUpdate(
        { userId: userId.id },
        {
          $push: {
            crates: crate,
          },
        }
      );
      
      console.log(crate)
      interaction.reply({
        ephemeral: true,
        embeds: [
          new Embed({
            title: `Crate has been made!`,
            description: `Created crate has been added too <@${userId.id}>!\n\n**Crate**:\n\`\`\`js\n{\n type: "${crate.type}"\n name: "${crate.name}"\n obtained: ${crate.obtained}\n gifted: ${crate.gifted}\n description: ${crate.description}\n ID: "${id}" \n}\n\`\`\``,
          }),
        ],
      });
  },
});
