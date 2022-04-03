import {
  ButtonInteraction,
  CommandInteractionOptionResolver,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  SelectMenuInteraction,
  TextChannel,
} from "discord.js";
import Guilds from "../../data/schemas/Guilds";
import { Helper } from "../../structures/Client";
import { Embed } from "../../structures/Embed";
import { Extendedinteraction } from "../../types/CommandTypes";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

const EventOptions = [
  { label: `Message Update`, value: `message_update` },
  { label: `Message Delete`, value: `message_delete` },
  { label: `Channel Created`, value: `channel_create` },
  { label: `Channel Deleted`, value: `channel_deleted` },
  { label: `Role Created`, value: `role_created` },
  { label: `Role Deleted`, value: `role_deleted` },
  { label: `VC Joined`, value: `vc_join` },
  { label: `VC Left`, value: `vc_left` },
  { label: `VC Move`, value: `vc_move` },
  { label: `Member Join`, value: `member_join` },
  { label: `Member Left`, value: `member_left` },
  { label: `Member Ban ( BOT ONLY )`, value: `member_ban` },
  { label: `Member Kick ( BOT ONLY )`, value: `member_kick` },
  { label: `Member Unban ( BOT ONLY )`, value: `member_unban` },
  { label: `Invite Created`, value: `invite_create` },
  { label: `Invite Delete`, value: `inivte_delete` },
  { label: `Thread Create`, value: `thread_create` },
  { label: `Thread Delete`, value: `thread_delete` },
];

export const Setup = async (
  client: Helper,
  interaction: Extendedinteraction,
  args: CommandInteractionOptionResolver
) => {
  if (interaction.replied) interaction.deleteReply();
  interaction.reply({
    components: [
      new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId("events")
          .setLabel("Events")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("channel")
          .setLabel("Channel")
          .setStyle("SECONDARY"),
      ]),
    ],
    ephemeral: true,
    embeds: [
      new Embed({
        title: `Helper's Logging Setup!`,
        description: `Please choose one of the buttons below to get started!`,
      }),
    ],
  });
  const collector = interaction.channel.createMessageComponentCollector({ componentType: "BUTTON" })
  collector.on("collect", (i) => {
    if (i.user.id !== interaction.user.id || i.user.bot) return;
    if (i.customId === "events") return Events(client, i, args)
    if(i.customId === "channel") return UpdateChannel(client, i)
  })
};

export const Events = async (
  client: Helper,
  interaction: Extendedinteraction | ButtonInteraction,
  args: CommandInteractionOptionResolver
) => {
  interaction.reply({
    ephemeral: true,
    components: [
      new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId("add_event")
          .setLabel("Add Event")
          .setStyle("SUCCESS"),
        new MessageButton()
          .setCustomId("remove_event")
          .setLabel("Remove Event")
          .setStyle("DANGER"),
        new MessageButton()
          .setCustomId("list_event")
          .setLabel("List Events")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("clear_event")
          .setLabel("Clear Events")
          .setStyle("SECONDARY"),
      ]),
    ],
    embeds: [
      new Embed({
        title: `Logging Events`,
        description: `Please choose one of the buttons below to continue the config!`,
      }),
    ],
  });

  const collector = interaction.channel.createMessageComponentCollector({
    componentType: "BUTTON",
  });
  collector.on("collect", (i) => {
    if (i.user.id !== interaction.user.id || i.user.bot) return;
    if (i.customId === "add_event") {
      AddEvent(client, i);
    }
    if (i.customId === "remove_event") {
      RemoveEvent(client, i);
    }
    if (i.customId === "list_event") {
      ListEvents(client, i);
    }
    if (i.customId === "clear_event") {
      ClearEvents(client, i);
    }
  });
};

export const AddEvent = async (
  client: Helper,
  interaction: ButtonInteraction
) => {
  if(interaction.replied) interaction.deleteReply().catch(() => {})
  interaction.reply({
    ephemeral: true,
    components: [
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .addOptions(EventOptions)
          .setCustomId("add_event_dropdown")
          .setPlaceholder("Events here!")
          .setMinValues(1)
          .setMaxValues(EventOptions.length),
      ]),
    ],
    embeds: [
      new Embed({
        title: `Logging Events`,
        description: `Please choose one or more of the events below for them to be added to your logging configuration!`,
      }),
    ],
  });

  const eventCollector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
  });
  eventCollector.on("collect", async (i) => {
    if (i.user.id !== interaction.user.id || i.user.bot) return;
    const guildSettings = await Guilds.findOne({
      guildId: interaction.guild.id,
    });
    const newOptions = [];
    i.values.forEach((value) => {
      if (guildSettings.logging_events.includes(value)) return;
      newOptions.push(value);
    });
    await Guilds.findOneAndUpdate(
      { guildId: interaction.guild.id },
      {
        $push: {
          logging_events: newOptions,
        },
      }
    );
    return eventCollector.stop("finshed");
  });
  eventCollector.on("end", (c, r) => {
    if (r.toLowerCase() === "finshed") {
      interaction.editReply({
        components: [],
        embeds: [
          new Embed({
            title: `Events Collected!`,
            description: `We have collected your chosen events and have added the ones that you didnt have already!`,
          }),
        ],
      });
    }
  });
};
export const RemoveEvent = async (
  client: Helper,
  interaction: ButtonInteraction
) => {
  if (interaction.replied) interaction.deleteReply().catch(() => {});
  const guildSettings = await Guilds.findOne({ guildId: interaction.guild.id });
  if (guildSettings.logging_events.length < 1) {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        new Embed({
          title: `No Events Found!`,
          description: `It appears you do not have any logging events saved, Please add some first before trying to remove them!`,
        }),
      ],
    });
  }
  const avaliableEvents = [];
  guildSettings.logging_events.forEach((event) => {
    for (let value of EventOptions) {
      if (value.value === event) {
        avaliableEvents.push({ label: value.label, value: value.value });
      }
    }
  });
  interaction.reply({
    components: [
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .addOptions(avaliableEvents)
          .setCustomId("remove_event_dropdown")
          .setPlaceholder("Events here!")
          .setMinValues(1)
          .setMaxValues(guildSettings.logging_events.length),
      ]),
    ],
    ephemeral: true,
    embeds: [
      new Embed({
        title: `Logging Events`,
        description: `Please select the one or more of the events below that you would like to remove from your configuration!`,
      }),
    ],
  });

  const removeCollector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
  });
  removeCollector.on("collect", async (i) => {
    if (i.user.id !== interaction.user.id || i.user.bot) return;
    i.values.forEach((value) => {
      let index;
      guildSettings.logging_events.forEach((event) => {
        if (event === value)
          index = guildSettings.logging_events.indexOf(event);
      });
      guildSettings.logging_events.splice(index, 1);
    });
    guildSettings.save();
    return removeCollector.stop("finshed");
  });
  removeCollector.on("end", (c, r) => {
    if (r.toLowerCase() === "finshed") {
      interaction.editReply({
        components: [],
        embeds: [
          new Embed({
            title: `Events Removed!`,
            description: `We have removed the chosen events from your logging configuration!`,
          }),
        ],
      });
    }
  });
};

export const ClearEvents = async (
  client: Helper,
  interaction: ButtonInteraction
) => {
  if (interaction.replied) interaction.deleteReply().catch(() => {});
  const guildSettings = await Guilds.findOne({
    guildId: interaction.guild.id,
  });
  if (guildSettings.logging_events.length < 1) {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        new Embed({
          title: `No Events Found!`,
          description: `It appears you do not have any logging events saved, Please add some first before trying to remove them all!`,
        }),
      ],
    });
  }
  await Guilds.findOneAndUpdate(
    { guildId: interaction.guild.id },
    {
      logging_events: [],
    }
  );

  interaction.reply({
    ephemeral: true,
    embeds: [
      new Embed({
        title: `Events Cleared!`,
        description: `We have cleared all your events from your logging configuration!`,
      }),
    ],
  });
};
export const ListEvents = async (
  client: Helper,
  interaction: ButtonInteraction
) => {
  if (interaction.replied) interaction.deleteReply().catch(() => {});
  const guildSettings = await Guilds.findOne({
    guildId: interaction.guild.id,
  });
  if (guildSettings.logging_events.length < 1) {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        new Embed({
          title: `No Events Found!`,
          description: `It appears you do not have any logging events saved, Please add some first before trying to list them!`,
        }),
      ],
    });
  }
  const formattedEvents = [];
  guildSettings.logging_events.forEach((event) => {
    for (let value of EventOptions) {
      if (value.value === event)
        formattedEvents.push({ label: value.label, value: value.value });
    }
  });
  interaction.reply({
    components: [
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .addOptions(formattedEvents)
          .setCustomId("listed_events")
          .setPlaceholder("Events Here!"),
      ]),
    ],
    ephemeral: true,
    embeds: [
      new Embed({
        title: `Events Listed!`,
        description: `All your current logging events can be found in the dropdown below!`,
      }),
    ],
  });
  const cancelCollector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
  });
  cancelCollector.on("collect", async (i) => {
    if (i.user.id !== interaction.user.id || i.user.bot) return;
    await i.deferUpdate().catch(() => {})
  });
};

export const UpdateChannel = async (
  client: Helper,
  interaction: Extendedinteraction | SelectMenuInteraction | ButtonInteraction
) => {
  if (interaction.replied) interaction.deleteReply().catch(() => {});
  const options = [];
  interaction.guild.channels.cache
    .filter(
      (f) =>
        f.type === "GUILD_TEXT" &&
        f
          .permissionsFor(interaction.guild.me)
          .has(
            ["VIEW_CHANNEL", "EMBED_LINKS", "SEND_MESSAGES"] || [
              "ADMINISTRATOR",
            ]
          )
    )
    .forEach((channel) => {
      options.push({
        label: `${channel.name.replace("-", "")}`,
        value: `${channel.id}`,
      });
    });

  const dropdowns = [];
  for (let i = 0; i < options.length; i++) {
    dropdowns.push(
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .addOptions(options.splice(0, 24))
          .setCustomId(`dropdown-logs-${i}`),
      ])
    );
  }
  interaction
    .reply({
      components: dropdowns,
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Logging Channel`,
          description: `Please select a channel below that you would like logs to be sent into!`,
        }),
      ],
    })
    .catch(() => {});

  const collector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
  });

  let selectedValue;
  collector.on("collect", (i) => {
    if (i.user.bot || i.user.id !== interaction.user.id) return;
    selectedValue = i.values[0];
    return collector.stop("finshed");
  });
  collector.on("end", async (c, r) => {
    if (r.toLowerCase() === "finshed") {
      await Guilds.findOneAndUpdate(
        { guildId: interaction.guild.id },
        {
          logging_channel: selectedValue,
        }
      );
      const channel = interaction.guild.channels.cache.find(
        (c) => c.id === selectedValue
      ) as TextChannel;
      interaction.editReply({
        components: [],
        embeds: [
          new Embed({
            title: `Logs Channel Collected`,
            description: `Your logs channel choice ( **${channel.name}** ) has successfully been saved to your configuration!`,
          }),
        ],
      });
    }
  });
};