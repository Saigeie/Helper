import { CommandInteractionOptionResolver, GuildMember } from "discord.js";
import Users from "../../data/schemas/Users";
import { client } from "../../index";
import genKey from "../../modules/genKey";
import { messageDelete } from "../../modules/messageDelete";
// import { AddQuarentine } from "../../modules/Moderation/quarentine";
import { Embed } from "../../structures/Embed";
import { Event } from "../../structures/Event";
import { Extendedinteraction } from "../../types/CommandTypes";

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "You have used a non existent command",
        ephemeral: true,
      });
    let userData = await Users.findOne({ userId: interaction.member.user.id });
    if (!userData) await Users.create({ userId: interaction.member.user.id });
    userData = await Users.findOne({ userId: interaction.member.user.id });
    if (command.premium) return interaction.reply({
      embeds: [new Embed({
        title: `Premium Only!`,
        description: `It appears that \`${command.name}\` is a premium only command! As of now march 2022 it is impossible to buy premium unless gifted from the owner of helper!`
    })] });
    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as Extendedinteraction,
      userData: userData,
    });
  }

  if (interaction.isButton()) {
    //! Verification button code
    // if (interaction.customId === "verify_button") {
    //   const code = genKey(15);
    //   interaction.reply({
    //     ephemeral: true,
    //     embeds: [
    //       new Embed({
    //         title: `Verification`,
    //         description: `Please copy the code below into the current channel! You have a total of 2 minutes and 5 attempt to complete this task before you are quarantined >:(\n\n• \`${code}\``,
    //       }),
    //     ],
    //   });
    //   const collector = interaction.channel.createMessageCollector({
    //     time: 1000 * 60 * 2,
    //   });
    //   let tries = 0;
    //   collector.on("collect", (m) => {
    //     if (m.author.bot || m.author.id !== interaction.user.id) return;
    //     console.log(m.content, tries)
    //     if (tries === 5) {
    //       m.delete().catch(() => {});
    //       collector.stop("ran out of tries");
    //       return;
    //     }
    //     if (m.content === code) {
    //       m.delete().catch(() => {});
    //       collector.stop("correct");
    //       return;
    //     }
    //     tries++;
    //     m.channel.send({
    //       embeds: [
    //         new Embed(
    //           { description: `⚠ Incorrect, Please try again!` },
    //           interaction.member as GuildMember
    //         ),
    //       ],
    //     }).then((msg) => messageDelete(msg, 4000))
    //     m.delete().catch(() => {});
    //   });
    //   collector.on("end", async (c, r) => {
    //     if (r.toLowerCase() === "ran out of tries") {
    //       interaction.editReply({
    //         embeds: [new Embed({
    //           title: `Failed To Verify`,
    //           description: `It appears you have ran out of tries! You have been quarentined, you will need to contact a staff member to be verified!`
    //         })],
    //       });
    //       await AddQuarentine(interaction.member as GuildMember, interaction.guild)
    //     }
    //     if (r.toLowerCase() === "correct") {
    //       interaction.editReply({
    //         embeds: [
    //           new Embed({
    //             title: `Verification Successful`,
    //             description: `You have successfully guess the code! You are now verified 🤍`,
    //           }),
    //         ],
    //       });
    //     }
    //   });
    // }
  }
});
