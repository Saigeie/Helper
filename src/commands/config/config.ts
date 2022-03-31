import Guilds from "../../data/schemas/Guilds";
import { Command } from "../../structures/Command";
import { Embed } from "../../structures/Embed";

export default new Command({
  name: `config`,
  userPermissions: ["ADMINISTRATOR"],
  exampleUsage: "/config [category]",
  description: `🔨 | View the saved config for a certain category`,
  options: [
    {
      name: `category`,
      description: `🔨 | The config category`,
      required: false,
      type: "STRING",
      choices: [{ name: `tickets`, value: `tickets` }],
    },
  ],
  run: async ({ interaction, args }) => {
    const category = args.getString("category") || "none";
    switch (category) {
      case "none":
        interaction.reply({
          embeds: [
            new Embed(
              {
                title: `Helper's Config`,
                description: ` > Please select a category to view its config!\n > Options can be viewed by doing \`/config\` then choose the category!`,
              },
              interaction.member
            ),
          ],
        });
        break;
        case "tickets":
            const ticketConfig = await Guilds.findOne({guildId: interaction.guild.id})
            if (!ticketConfig) {
               return interaction.reply({
                 embeds: [
                   new Embed(
                     {
                       title: `Ticket Config`,
                       description: `Ticket configuration for guild: \`${
                         interaction.guild.id
                       }\`\n\n\`\`\`\nNo configuration found!\n\`\`\``,
                     },
                     interaction.member
                   ),
                 ],
               });
            } 
             interaction.reply({
               embeds: [
                 new Embed(
                   {
                     title: `Ticket Config`,
                     description: `Ticket configuration for guild: \`${
                       interaction.guild.id
                     }\`\n\n\`\`\`json\nChannel: "${
                       ticketConfig.tickets_channel || "None"
                     }"\nCategory: "${
                       ticketConfig.tickets_category || "None"
                     }"\nSupport Role: "${
                       ticketConfig.tickets_support_role || "None"
                     }"\nDefault Name: "${
                       ticketConfig.tickets_default_name || "None"
                     }"\nLogs Channel: "${
                       ticketConfig.tickets_logs_channel || "None"
                     }"\nMessage: "${
                       ticketConfig.tickets_message || "None"
                     }"\n\`\`\``,
                   },
                   interaction.member
                 ),
               ],
             });
        break;
    }
  },
});
