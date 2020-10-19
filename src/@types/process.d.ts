declare namespace NodeJS {
  export interface ProcessEnv {
    MY_HOST: string;
    SERVER_PORT: string;

    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_NAME: string;
    DB_PASSWORD: string;
  }
}
