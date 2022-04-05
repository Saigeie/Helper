import chalk from "chalk";
import {
  CommandInteractionOptionResolver,
  GuildMember,
  TextChannel,
} from "discord.js";
import ClientData from "../../data/schemas/ClientData";
import Guilds from "../../data/schemas/Guilds";
import Tickets from "../../data/schemas/Tickets";
import Users from "../../data/schemas/Users";
import { client } from "../../index";
import { CreateTicket } from "../../modules/Configuration/Tickets";
import { formatPerm } from "../../modules/format";
import genKey from "../../modules/genKey";
import { messageDelete } from "../../modules/messageDelete";
// import { AddQuarentine } from "../../modules/Moderation/quarentine";
import { Embed } from "../../structures/Embed";
import { Event } from "../../structures/Event";
import LinkButtons from "../../structures/LinkButtons";
import { Extendedinteraction } from "../../types/CommandTypes";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        components: [LinkButtons],
        content:
          "It appears this command does not exist? If you believe this is a mistake please contact support",
        ephemeral: true,
      });
    let userData = await Users.findOne({ userId: interaction.member.user.id });
    if (!userData) await Users.create({ userId: interaction.member.user.id });
    userData = await Users.findOne({ userId: interaction.member.user.id });
    let guildData = await Guilds.findOne({ guildId: interaction.guild.id });
    let commandCategories = [];
    client.commands.forEach((cmd) => {
      if (commandCategories.includes(cmd.category)) return;
      commandCategories.push(cmd.category);
    });
    if (!guildData) await Guilds.create({
      guildId: interaction.guild.id,
      enabled_categories: commandCategories,
    });
    commandCategories = [];
    guildData = await Guilds.findOne({ guildId: interaction.guild.id });
    if (command.premium)
      return interaction.reply({
        embeds: [
          new Embed({
            title: `Premium Only!`,
            description: `It appears that \`${command.name}\` is a premium only command! As of now march 2022 it is impossible to buy premium unless gifted from the owner of helper!`,
          }),
        ],
      });
    if (command.owner) {
      if (!client.config.owner_ids.includes(`${interaction.user.id}`))
        return interaction.reply({
          embeds: [
            new Embed({
              title: `Owner Only!`,
              description: `It appears that \`${command.name}\` is a owner only command!`,
            }),
          ],
        });
    }
    if (!guildData.enabled_categories.includes(command.category)) {
      return interaction.reply({
        embeds: [
          new Embed({
            title: `Category Disabled!`,
            description: `It appears that \`${command.name}\`'s category has been disabled in the [**dashboard**](https://helper.solar/dashboard/${interaction.guild.id})!`,
          }),
        ],
      });
    }
    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as Extendedinteraction,
      userData: userData,
    });
    const oldClientData = await ClientData.findOne({key: `${process.env.SERVER_KEY}`})
    await ClientData.findOneAndUpdate({ key: `${process.env.SERVER_KEY}` }, {
      commandsRan: oldClientData.commandsRan + 1
    })

    client.logger.info(`Command Ran: ${chalk.redBright(command.name)} | Guild: ${interaction.guild.id} | Member: ${interaction.member.user.id}`)
  }

  if (interaction.isSelectMenu()) {
    if (interaction.customId === "online_staff") {
      await interaction.deferUpdate();
    }
  }
  if (interaction.isButton()) {
    if (interaction.customId === "open_ticket") {
      await CreateTicket(client, interaction);
    }
    if (interaction.customId === "close_ticket") {
      await interaction.channel.delete().catch(() => {
        interaction.editReply({
          embeds: [
            new Embed({
              title: `Failed to admit task!`,
              description: `It appears it would not let me delete this ticket, Please get a staff member to delete it manually!`,
            }),
          ],
        });
      });
      await interaction.deferUpdate();
    }
    if (interaction.customId === "add_user_ticket") {
      if (interaction.replied) interaction.deleteReply().catch(() => {});
      interaction.reply({
        ephemeral: true,
        embeds: [
          new Embed({
            title: `Mention Member`,
            description: `Please ping a member below for them to be added to the ticket!`,
          }),
        ],
      });
      const collector = interaction.channel.createMessageCollector();
      const member = interaction.guild.members.cache.find(
        (m) => m.id === interaction.user.id
      );
      const guildSettings = await Guilds.findOne({
        guildId: interaction.guild.id,
      });
      let mentionedMember;
      collector.on("collect", (msg) => {
        if (
          msg.author.bot ||
          msg.author.id !== interaction.user.id
        ) return;
        mentionedMember =
          msg.mentions.members.first() ||
          interaction.guild.members.cache.find(
            (m) =>
              m.id === msg.content.split(" ")[0] ||
              m.user.username.toLowerCase() === msg.content.toLowerCase() ||
              m.user.tag.toLowerCase() === msg.content.toLowerCase()
          ) as GuildMember
        msg.delete().catch(() => {})
        return collector.stop("finshed");
      });

      collector.on("end", async (c, r) => {
        if (r.toLowerCase() === "finshed") {
          if (!mentionedMember) {
            interaction.editReply({
              embeds: [
                new Embed({
                  title: `Failed to fetch member!`,
                  description: `Please ping a valid member, There was an error finding the member you mentioned!`,
                }),
              ],
            });
            return;
          } 
          const ticket =  await Tickets.findOne({ channelId: interaction.channel.id })
          const alreadyInTicket = ticket.allowedUsers.includes(`${mentionedMember.id}`)
  
          if (alreadyInTicket) {
               interaction.editReply({
                 embeds: [
                   new Embed({
                     title: `Member Already Exists`,
                     description: `It appears member ( <@${mentionedMember.user.id}> ) has already been added to this ticket!`,
                   }),
                 ],
               });
            return;
          }


          (interaction.channel as TextChannel).permissionOverwrites.create(`${mentionedMember.id}`, {
            VIEW_CHANNEL: true,
            EMBED_LINKS: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true, 
            READ_MESSAGE_HISTORY: true
          })

          await Tickets.findOneAndUpdate({ channelId: interaction.channel.id }, {
            $push: {
              allowedUsers: mentionedMember.id
            }
          })
          
          interaction.editReply({
            embeds: [
              new Embed({
                title: `Member Fetched`,
                description: `Member ( <@${mentionedMember.user.id}> ) has been collected and added to the ticket!`,
              }),
            ],
          });
        }
      });
    }
    if (interaction.customId === "remove_user_ticket") {
        if (interaction.replied) interaction.deleteReply().catch(() => {});
        interaction.reply({
          ephemeral: true,
          embeds: [
            new Embed({
              title: `Mention Member`,
              description: `Please ping a member below for them to be removed from the ticket!`,
            }),
          ],
        });
        const collector = interaction.channel.createMessageCollector();
        const member = interaction.guild.members.cache.find(
          (m) => m.id === interaction.user.id
        );
        const guildSettings = await Guilds.findOne({
          guildId: interaction.guild.id,
        });
        let mentionedMember;
        collector.on("collect", (msg) => {
          if (msg.author.bot || msg.author.id !== interaction.user.id) return;
          mentionedMember =
            msg.mentions.members.first() ||
            (interaction.guild.members.cache.find(
              (m) =>
                m.id === msg.content.split(" ")[0] ||
                m.user.username.toLowerCase() === msg.content.toLowerCase() ||
                m.user.tag.toLowerCase() === msg.content.toLowerCase()
            ) as GuildMember);
          msg.delete().catch(() => {});
          return collector.stop("finshed");
        });

        collector.on("end", async (c, r) => {
          if (r.toLowerCase() === "finshed") {
            if (!mentionedMember) {
              interaction.editReply({
                embeds: [
                  new Embed({
                    title: `Failed to fetch member!`,
                    description: `Please ping a valid member, There was an error finding the member you mentioned!`,
                  }),
                ],
              });
              return;
            }
            const ticket = await Tickets.findOne({
              channelId: interaction.channel.id,
            });
            const alreadyInTicket = ticket.allowedUsers.includes(
              `${mentionedMember.id}`
            );
            if (!alreadyInTicket) {
              interaction.editReply({
                embeds: [
                  new Embed({
                    title: `Member Doesnt Exists`,
                    description: `It appears member ( <@${mentionedMember.user.id}> ) does not already have access to this ticket!`,
                  }),
                ],
              });
              return;
            }

            (interaction.channel as TextChannel).permissionOverwrites.create(
              `${mentionedMember.id}`,
              {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
              }
            );
            let index;
              ticket.allowedUsers.forEach((user) => { if(user === mentionedMember.id) return index = ticket.allowedUsers.indexOf(user)})
            ticket.allowedUsers.splice(index, 1); ticket.save()
            interaction.editReply({
              embeds: [
                new Embed({
                  title: `Member Fetched`,
                  description: `Member ( <@${mentionedMember.user.id}> ) has been collected and removed to the ticket!`,
                }),
              ],
            });
          }
        });
    }
  }
});