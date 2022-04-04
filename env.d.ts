declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      DISCORD_BETA_TOKEN: string;
      MONGODB: string;
      GUILD_ID: string;
      INVITE: string;
      WEBHOOK_URL: string;
      WEBHOOK_ID: string;
      PORT: string;
      SERVER_KEY: string;
      AUTH_LOGIN_URL: string;
      AUTH_CALLBACK: string;
      AUTH_CLIENT_ID: string;
      AUTH_CLIENT_SECRET: string;
      AUTH_CLIENT_SECRET: string;
    }
  }
}

export {}
