declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      DB: string;
    }
  }
}

export {}
