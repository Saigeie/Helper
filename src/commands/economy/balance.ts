import { MessageActionRow, MessageButton } from "discord.js";
import Users, { Crate } from "../../data/schemas/Users";
import Dropdowns from "../../modules/dropdowns";
import Pagination from "../../modules/pagination";
import { Command } from "../../structures/Command";
import { EcoEmbed } from "../../structures/ecoEmbed";
import { Embed } from "../../structures/Embed";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export default new Command({
    name: `balance`,
    description: `👛 | View your balance`,
    exampleUsage: `/balance [user]`,
    category: "economy",
    options: [{ type: "USER", name: `user`, description: `👛 | View a certain users balacne`, required: false}],
    run: async ({ interaction, args, client }) => {
        const user = args.getUser("user") || interaction.user;
        const userData = await Users.findOne({ userId: user.id  })
        if (!userData) {
            return interaction.reply({
                embeds: [new Embed({
                    title: `No Data Found!`,
                    description: `I can not find any economy data for the user mentioned / for you!`
            })]})
        }
        interaction.reply({
            components: [new MessageActionRow().addComponents([new MessageButton().setCustomId("view_crates").setLabel("View Crates").setStyle("SECONDARY")])],
          embeds: [
            new EcoEmbed({
              title: `${user.username}'s balance`,
              description: `**Wallet**: ${client.config.emojis.coin} ${userData.wallet}\n**Bank**: ${client.config.emojis.coin} ${userData.bank} / ${userData.bank_cap}`,
            }),
          ],
        });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: "BUTTON" })
        collector.on("collect", (i) => {
            if (i.customId === "view_crates") { 
              const formattedCrates = []
                   const categories = [];
                const embeds = []
              userData.crates.forEach((crate: Crate) => {
                  categories.push({ label: `${crate.name} - ${crate.type}`, value: `${crate.id}`})
                    formattedCrates.push({
                      id: `${crate.id}`,
                      embed: [
                        new Embed({
                          title: `Crate - ${crate.type}`,
                          description: `**Type**: ${crate.type}\n**Name:** ${
                            crate.name
                          }\n**Obtained**: <t:${Math.floor(
                            crate.obtained / 1000
                          )}:F>\n**Gifted**: ${crate.gifted}\n**ID**: \`${
                            crate.id
                          }\`\n**Description**: \`\`\`\n${
                            crate.description
                          }\n\`\`\``,
                        }),
                      ],
                    });
                })
                if (formattedCrates[0].embed.length < 1) {
                   return i.reply({
                      ephemeral: true,
                      embeds: [
                        new Embed({
                          title: `No Crates!`,
                          description: `It appears this user has no crates!${
                            user.id !== interaction.user.id
                              ? ` Feeling nice? You can gift one to them! \`/gift crate [userId] [crateId]\``
                              : ""
                          }`,
                        }),
                      ],
                    });
              }
         
              
                Dropdowns(formattedCrates, i, client, categories, `balcmd_crates`)
                
            }
        })
    }
})