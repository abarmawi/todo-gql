declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    APP_DB_URI: string;
    APP_MOCK_TODO_SERVER: string;
  }
}
