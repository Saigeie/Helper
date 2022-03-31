declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      MONGODB: string;
      GUILD_ID: string;
      INVITE: string;
      WEBHOOK_URL: string;
      WEBHOOK_ID: string;
    }
  }
}

export {}
