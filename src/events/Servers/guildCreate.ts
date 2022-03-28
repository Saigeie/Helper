import { MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { client } from "../..";
import Guilds from "../../data/schemas/Guilds";
import genKey from "../../modules/genKey";
import { messageDelete } from "../../modules/messageDelete";
import { Embed } from "../../structures/Embed";
import { Event } from "../../structures/Event";
import buttons from "../../structures/LinkButtons"
export default new Event(`guildCreate`, async (guild) => {
  await Guilds.create({ guildId: guild.id})
  const textChats = guild.channels.cache
    .filter(
      (f) =>
        f.type === "GUILD_TEXT" &&
        f
          .permissionsFor(guild.me)
          .has(["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS"])
    )
    .first() as TextChannel;
  const key = genKey()
  if (guild.members.cache.filter((f) => !f.user.bot).size < 30 && !client.config.ignored_requirement_servers.includes(`${guild.id}`)) {
    textChats.send({
      components: [buttons],
      embeds: [
        new Embed({
          title: `It appears you do not meet our requirements!`,
          description: `It appears **${guild.name}** does not meet our bot [\`requirements\`]()`,
        }),
      ],
    });

    setTimeout(() => {
      guild.leave().catch(() => {});
    }, 5000);
  } else {
    
    const owner = guild.members.cache.find((f) => f.id === guild.ownerId);
    textChats.send({ content: `<@${owner.user.id}>` }).then((msg) => {
      messageDelete(msg)
    })
    textChats.send({
      components: [buttons],
      embeds: [
        new Embed({
          title: `Thank you for choosing helper.`,
          description: `You will have a DM sortly with more information including your Owner Key. And explaining its reasioning etc.\n\n**We hope you enjoy Helper!**`,
        }),
      ],
    });

    if (!owner) return;
    owner
      .send({
        components: [buttons],
        embeds: [
          new Embed({
            title: `Thanks for choosing helper!`,
            description: `Once again thank you for choosing helper, your needed information can be found below!\n\u200B`,
            fields: [
              {
                name: `Owner Key`,
                value: `• ||\`${key}\`||\n\n > Your owner key is used to authenticate private actions. If use wish to delete your server data etc then your Owner Key is required. So please dont loose it!`,
              },
            ],
          }),
        ],
      })
      .catch(() => {
        textChats.send({
          components: [buttons],
          embeds: [new Embed({
            title: `Oh no!`,
            description: `It appears we were not able to send you a private message! Please join the support server to find out your owner key :(\n\n*This message will delete after 60 seconds**`,
          })],
        }).then((msg) => messageDelete(msg, 60000))
      });
    
    
    
  }
});
