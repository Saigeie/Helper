import {
  ButtonInteraction,
  CategoryChannel,
  CommandInteractionOptionResolver,
  Guild,
  GuildMember,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  Permissions,
  Role,
  SelectMenuInteraction,
  TextChannel,
} from "discord.js";
import Guilds from "../../data/schemas/Guilds";
import { Helper } from "../../structures/Client";
import { Embed } from "../../structures/Embed";
import { Extendedinteraction } from "../../types/CommandTypes";
import TextFormatTerms from "../../data/textFormatterTerms";
import { textFormatters } from "../format";
import Tickets from "../../data/schemas/Tickets";
import genKey from "../genKey";
import LinkButtons from "../../structures/LinkButtons";
import { messageDelete } from "../messageDelete";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

export const Setup = async (
  client: Helper,
  interaction: Extendedinteraction,
  args: CommandInteractionOptionResolver
) => {
  const buttons = [
    new MessageActionRow().addComponents([
      new MessageButton()
        .setCustomId("finsh_button")
        .setLabel("Finsh")
        .setStyle("SUCCESS"),
      new MessageButton()
        .setLabel("How To Setup")
        .setStyle("LINK")
        .setURL("https://github.com/Saigeie/Helper/wiki/Tickets"),
    ]),

    new MessageActionRow().addComponents([
      new MessageSelectMenu().setCustomId("ticket_select_menu").addOptions([
        { label: `Channel`, value: `channel` },
        { label: `Support Role`, value: `support_role` },
        { label: `Message`, value: `message` },
        {
          label: `Default Channel Name`,
          value: `default_channel_name`,
        },
        { label: `Ticket Category`, value: `category` },
        { label: `Logs Channel`, value: `logs_channel` },
      ]),
    ]),
  ];
  if (interaction.replied) {
    interaction.deleteReply();
  }
  interaction
    .reply({
      components: buttons,
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Helper's Ticket System`,
          description: ` > Please select one of the values from the dropdown below to start its configuration steps!\n\n > Once finshed with your configuration please press the "finsh" button to complete the prompt!`,
        }),
      ],
    })
    .catch(() => {});

  const collector = interaction.channel.createMessageComponentCollector({ time: 1000 * 60 });
  collector.on("collect", async (i) => {
    if (i.isButton()) {
      if (i.customId === "finsh_button") {
        AfterTicketSetup(client, i, args);
      }
    }
    if (i.isSelectMenu()) {
      const value = i.values[0];
      switch (value) {
        case "channel":
          UpdateChannel(client, i, args);
          break;
        case "support_role":
          UpdateSupportRole(client, i, args);
          break;
        case "message":
          UpdateMessage(client, i, args);
          break;
        case "default_channel_name":
          UpdateDefaultName(client, i, args);
          break;
        case "category":
          UpdateCategory(client, i, args);
          break;
        case "logs_channel":
          UpdateLogsChannel(client, i, args);
          break;
      }
    }
  });
  collector.on("end", (c, r) => {
    interaction
      .editReply({
        components: [],
        embeds: [
          new Embed({
            title: `Helper's Ticket System`,
            description: ` > Please select one of the values from the dropdown below to start its configuration steps!\n\n > Once finshed with your configuration please press the "finsh" button to complete the prompt!`,
          }),
        ],
      })
      .catch(() => {});

  })
};

export const UpdateChannel = async (
  client: Helper,
  interaction: SelectMenuInteraction,
  args: CommandInteractionOptionResolver
) => {
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
        label: `${channel.name.replace("-", " ")}`,
        value: `${channel.id}`,
      });
    });

  const dropdowns = [];
  for (let i = 0; i < options.length; i++) {
    dropdowns.push(
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .addOptions(options.splice(0, 24))
          .setCustomId(`dropdown-channel-${i}`),
      ])
    );
  }
  if (interaction.replied) {
    interaction.deleteReply();
  }
  interaction
    .reply({
      components: dropdowns,
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Ticket Channel`,
          description: `Please select a channel below that you would like the ticket's prompt to be sent into!`,
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
      if (r === "error") return;
      if (r.toLowerCase() === "finshed") {
        await Guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            tickets_channel: selectedValue,
          }
        );
        const channel = interaction.guild.channels.cache.find(
          (c) => c.id === selectedValue
        ) as TextChannel;
        interaction
          .editReply({
            components: [],
            embeds: [
              new Embed({
                title: `Channel Collected`,
                description: `Your channel choice ( **${channel.name}** ) has successfully been saved to your configuration
          `,
              }),
            ],
          })
          .catch(() => {});
      }
    });
};

export const UpdateMessage = async (
  client: Helper,
  interaction: SelectMenuInteraction,
  args: CommandInteractionOptionResolver
) => {
  const terms = await TextFormatTerms(
    interaction.guild.members.cache.find((m) => m.id === interaction.user.id),
    interaction.guild,
    interaction.channel as TextChannel
  );
  const textFormats = [];
  terms.forEach((term) => {
    textFormats.push(term.original);
  });
  if (interaction.replied) {
    interaction.deleteReply();
  }
  interaction
    .reply({
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Ticket Message`,
          description: `Please write a ticket prompt message below, This will be sent when a member opens a ticket! ( Limit of 1000 characters )\n\n**Message Formats:**\n\`${textFormats.join(
            "`, `"
          )}\``,
        }),
      ],
    })
    .catch(() => {});

  const collector = interaction.channel.createMessageCollector();

  let selectedValue;
  collector.on("collect", (msg) => {
    if (msg.author.bot || msg.author.id !== interaction.user.id) return;
    selectedValue = msg.content;
    msg.delete().catch(() => {});
    return collector.stop("finshed");
  });
    
    collector.on("end", async (c, r) => {
      if (r === "error") return;
      if (r.toLowerCase() === "finshed") {
        await Guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            tickets_message: selectedValue.slice(0, 1000),
          }
        );
        interaction
          .editReply({
            components: [],
            embeds: [
              new Embed({
                title: `Message Collected`,
                description: `Your ticket prompt message has successfully been saved to your configuration`,
                fields: [
                  {
                    name: `Message`,
                    value: `\`\`\`\n${selectedValue.slice(0, 1000)}\n\`\`\``,
                  },
                ],
              }),
            ],
          })
          .catch(() => {});
      }
    });
};

export const UpdateDefaultName = async (
  client: Helper,
  interaction: SelectMenuInteraction,
  args: CommandInteractionOptionResolver
) => {
  const terms = await TextFormatTerms(
    interaction.guild.members.cache.find((m) => m.id === interaction.user.id),
    interaction.guild,
    interaction.channel as TextChannel
  );
  const ignoredTextFormats = [
    "<<user:mention>>",
    "<<user:avatar>>",
    "<<user:created>>",
    "<<server:created>>",
    "<<server:icon>>",
  ];
  const textFormats = [];
  terms.forEach((term) => {
    if (
      ignoredTextFormats.includes(term.original) ||
      term.original.includes("channel")
    )
      return;
    textFormats.push(term.original);
  });
  if (interaction.replied) {
    interaction.deleteReply();
  }
  interaction
    .reply({
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Default Channel Name`,
          description: `Please right the default channel name below! This will be the name of the channel once created ( Limit of 50 characters )\n\n**Message Formats:**\n\`${textFormats.join(
            "`, `"
          )}\``,
        }),
      ],
    })
    .catch(() => {});

  const collector = interaction.channel.createMessageCollector();
  let selectedValue;
  collector.on("collect", (msg) => {
    if (msg.author.bot || msg.author.id !== interaction.user.id) return;
    selectedValue = msg.content;
    msg.delete().catch(() => {});
    return collector.stop("finshed");
  });
    collector.on("end", async (c, r) => {
      if (r === "error") return;
      if (r.toLowerCase() === "finshed") {
        const msg = selectedValue.slice(0, 50).replace(" ", "-");
        for (let block of ignoredTextFormats) {
          msg.split("-").forEach((word) => {
            if (word === block) {
              msg.replace(block, "");
            }
          });
        }
        await Guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            tickets_default_name: msg,
          }
        );
        interaction
          .editReply({
            components: [],
            embeds: [
              new Embed({
                title: `Name Collected`,
                description: `Your default channel name has successfully been saved to your configuration`,
                fields: [
                  {
                    name: `Name`,
                    value: `\`\`\`\n${msg}\n\`\`\``,
                  },
                ],
              }),
            ],
          })
          .catch(() => {});
      }
    });
};

export const UpdateSupportRole = async (
  client: Helper,
  interaction: SelectMenuInteraction,
  args: CommandInteractionOptionResolver
) => {
  const options = [{ label: `Create one for me`, value: `create_one`}];
  interaction.guild.roles.cache
    .filter(
      (f) =>
        f.position < interaction.guild.me.roles.highest.position &&
        !f.managed &&
        f.id !== interaction.guild.id
    )
    .forEach((role) => {
      options.push({
        label: `${role.name.replace("-", "")}`,
        value: `${role.id}`,
      });
    });

  const dropdowns = [];
  for (let i = 0; i < options.length; i++) {
    dropdowns.push(
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .addOptions(options.splice(0, 24))
          .setCustomId(`dropdown-role-${i}`),
      ])
    );
  }
  if (interaction.replied) {
    interaction.deleteReply();
  }
  interaction
    .reply({
      components: dropdowns,
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Ticket Support Role`,
          description: `Please select a role below! This role will be able to manage & deal with tickets!`,
        }),
      ],
    })
    .catch(() => {});

  const collector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
  });
  let selectedValue;
  collector.on("collect", async (i) => {
    if (i.user.bot || i.user.id !== interaction.user.id) return;
    const value = i.values[0]
    if (value === "create_one") {
      const role = await i.guild.roles
        .create({
          name: `Ticket Support`,
          color: client.config.colour,
          hoist: true,
          mentionable: false,
        })
      selectedValue = role.id
    } else {
      selectedValue = value
    }
    return collector.stop("finshed");
  });
  collector.on("end", async (c, r) => {
    if (r === "error") return;
    if (r.toLowerCase() === "finshed") {
      await Guilds.findOneAndUpdate(
        { guildId: interaction.guild.id },
        {
          tickets_support_role: selectedValue,
        }
      );
      const role = interaction.guild.roles.cache.find(
        (c) => c.id === selectedValue
      ) as Role;
      interaction
        .editReply({
          components: [],
          embeds: [
            new Embed({
              title: `Role Collected`,
              description: `Your role choice ( **${role.name}** ) has successfully been saved to your configuration
          `,
            }),
          ],
        })
        .catch(() => {});
    }
  });
};

export const UpdateCategory = async (
  client: Helper,
  interaction: SelectMenuInteraction,
  args: CommandInteractionOptionResolver
) => {
  const options = [
    {
      label: `Create One For Me`,
      value: `create_one`,
    },
  ];
  interaction.guild.channels.cache
    .filter(
      (f) =>
        f.type === "GUILD_CATEGORY" &&
        f
          .permissionsFor(interaction.guild.me)
          .has(
            ["VIEW_CHANNEL", "EMBED_LINKS", "SEND_MESSAGES"] || [
              "ADMINISTRATOR",
            ]
          )
    )
    .forEach((category) => {
      options.push({
        label: `${category.name.replace("-", "")}`,
        value: `${category.id}`,
      });
    });

  const dropdowns = [];
  for (let i = 0; i < options.length; i++) {
    dropdowns.push(
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .addOptions(options.splice(0, 24))
          .setCustomId(`dropdown-category-${i}`),
      ])
    );
  }
  if (interaction.replied) {
    interaction.deleteReply();
  }
  interaction
    .reply({
      components: dropdowns,
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Ticket Category`,
          description: `Please select a category below that you would like the ticket to be created in!`,
        }),
      ],
    })
    .catch(() => {});

  const collector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
  });

  let selectedValue;
  collector.on("collect", async (i) => {
    if (i.user.bot || i.user.id !== interaction.user.id) return;
    const value = i.values[0];
    if (value === "create_one") {
      const category = await i.guild.channels.create(`Tickets`, {
        type: "GUILD_CATEGORY",
        permissionOverwrites: [
          {
            id: `${i.guild.id}`,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            type: "role",
          },
        ],
      });
      selectedValue = category.id;
    } else {
      selectedValue = value;
    }
    return collector.stop("finshed");
  });
  collector.on("end", async (c, r) => {
    if (r.toLowerCase() === "finshed") {
      await Guilds.findOneAndUpdate(
        { guildId: interaction.guild.id },
        {
          tickets_category: selectedValue,
        }
      );
      const category = interaction.guild.channels.cache.find(
        (c) => c.id === selectedValue
      ) as CategoryChannel;
      interaction
        .editReply({
          components: [],
          embeds: [
            new Embed({
              title: `Category Collected`,
              description: `Your category choice ( **${category.name}** ) has successfully been saved to your configuration
          `,
            }),
          ],
        })
        .catch(() => {});
    }
  });
};
export const UpdateLogsChannel = async (
  client: Helper,
  interaction: SelectMenuInteraction,
  args: CommandInteractionOptionResolver
) => {
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
  if (interaction.replied) {
    interaction.deleteReply();
  }
  interaction
    .reply({
      components: dropdowns,
      ephemeral: true,
      embeds: [
        new Embed({
          title: `Ticket Logs Channel`,
          description: `Please select a channel below that you would like ticket logs to be sent into!`,
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
      if (r === "error") return;
      if (r.toLowerCase() === "finshed") {
        await Guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            tickets_logs_channel: selectedValue,
          }
        );
        const channel = interaction.guild.channels.cache.find(
          (c) => c.id === selectedValue
        ) as TextChannel;
        interaction
          .editReply({
            components: [],
            embeds: [
              new Embed({
                title: `Logs Channel Collected`,
                description: `Your logs channel choice ( **${channel.name}** ) has successfully been saved to your configuration
          `,
              }),
            ],
          })
          .catch(() => {});
      }
    });
};

export const AfterTicketSetup = async (
  client: Helper,
  interaction: ButtonInteraction,
  args: CommandInteractionOptionResolver
) => {
  const guildData = await Guilds.findOne({ guildId: interaction.guild.id });
  const channel = (interaction.guild.channels.cache.find(
    (c) => c.id === guildData.tickets_channel
  ) || interaction.channel) as TextChannel;
  channel.send({
    components: [
      new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId("open_ticket")
          .setLabel("Open!")
          .setEmoji("✨")
          .setStyle("SUCCESS"),
      ]),
    ],
    embeds: [
      new Embed({
        title: `Open a ticket!`,
        description: `Please press the button below to open a ticket!`,
      }),
    ],
  });
  if(interaction.replied) interaction.deleteReply().catch(() => {})
  interaction.reply({
    ephemeral: true,
    components: [LinkButtons],
    embeds: [new Embed({
      title: `Ticket Prompt Completed`,
      description: `Your ticket prompt has successfully been saved, Please visit <#${channel.id}> to see it in action!`
    })]
  })
};

export const CreateTicket = async (
  client: Helper,
  interaction: ButtonInteraction
) => {
  const guildSettings = await Guilds.findOne({
    guildId: interaction.guild.id,
  });

  const alreadyOpened = await Tickets.findOne({ owner: interaction.user.id });
  if (alreadyOpened) {
    interaction.reply({
      ephemeral: true,
      components: [LinkButtons],
      embeds: [
        new Embed({
          title: `Ticket Already Opened`,
          description: `It appears you already have a ticket opened, Please refere back to that ticket! <#${alreadyOpened.channelId}>`,
        }),
      ],
    });
    return;
  }
  const channel = await interaction.guild.channels.create(
    `ticket-${interaction.user.id}`,
    {
      parent: `${guildSettings.tickets_category}`,
      type: `GUILD_TEXT`,
      permissionOverwrites: [
        { id: `${interaction.guild.id}`, deny: ["VIEW_CHANNEL"], type: "role" },
        {
          id: `${client.user.id}`,
          allow: [
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "EMBED_LINKS",
            "MANAGE_CHANNELS",
            "ATTACH_FILES",
            "READ_MESSAGE_HISTORY",
          ],
          type: "member",
        },
        {
          id: `${interaction.user.id}`,
          allow: [
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "EMBED_LINKS",
            "ATTACH_FILES",
            "READ_MESSAGE_HISTORY",
          ],
          type: "member",
        },
      ],
    }
  );
  if (guildSettings.tickets_default_name) {
    const text = await textFormatters(
      guildSettings.tickets_default_name,
      interaction.member as GuildMember,
      interaction.guild as Guild,
      channel as TextChannel
    );
    channel.setName(`${text.slice(0, 55)}`);
  }
  const formattedText = await textFormatters(
    guildSettings.tickets_message,
    interaction.member as GuildMember,
    interaction.guild as Guild,
    channel as TextChannel
  );
  const staff = []

  interaction.guild.members.cache.filter(f => f.roles.cache.has(`${guildSettings.tickets_support_role}`) || f.permissions.has("ADMINISTRATOR")).forEach((member) => {
  if (member.user.bot) return;
   staff.push({ label: `${member.user.tag} - ${member.user.id}`, value: `${member.user.id}`})
  })
  channel.send({
    components: [
      new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId("close_ticket")
          .setLabel("Close Ticket!")
          .setEmoji("🔨")
          .setStyle("DANGER"),
        new MessageButton()
          .setCustomId("add_user_ticket")
          .setLabel("Add user!")
          .setEmoji("👥")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("remove_user_ticket")
          .setLabel("Remove User!")
          .setEmoji("👥")
          .setStyle("SECONDARY"),
      ]),
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .setCustomId("online_staff")
          .setPlaceholder(`Staff Members`)
          .addOptions(staff),
      ]),
    ],
    embeds: [
      new Embed(
        {
          description: `${
            formattedText
          }`,
        },
        interaction.guild.members.cache.find(
          (m) => m.user.id === interaction.user.id
        ) as GuildMember,
        { footer: `Powered by Helper.solar` }
      ),
    ],
  });

  channel.send({ content: `<@&${guildSettings.tickets_support_role}> | <@${interaction.user.id}>`}).then((msg) => messageDelete(msg, 200))
  await Tickets.create({
    channelId: channel.id,
    owner: interaction.user.id,
    created: Date.now(),
    guildId: interaction.guild.id,
    id: await genKey(),
  });
  interaction.reply({
    ephemeral: true,
    components: [LinkButtons],
    embeds: [
      new Embed({
        description: `Your ticket has been created! <#${channel.id}>`,
      }),
    ],
  });
};
