declare module '*.jpg' {
  const value: any;
  export default value;
}
declare module '*.jpeg' {
  const value: any;
  export default value;
}
declare module "*.png" {
  const value: any;
  export default value;
}
declare module '*.svg' {
  const value: any;
  export default value;
}
declare namespace NodeJS {
  interface ProcessEnv {
    VARIABLES: string;
    NODE_ENV: 'development' | 'production';
    PORT: number;
    API_HOST_URL: string;
    API_HOST_PORT: string;
    API_HOST_PROTOCOL: string;
  }
}

declare const VARIABLES: string;
declare const SERVER_BUILD: boolean;
declare const DEV: boolean;
declare const API_HOST_URL: string;
declare const API_HOST_PORT: string;
declare const API_HOST_PROTOCOL: string;


declare module 'redux-promise-listener' {
  const createReduxPromiseListener: () => ({
    middleware: any,
    createAsyncFunction?: any,
    generateAsyncFunction?: any,
  });
  export = createReduxPromiseListener;
}

declare type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
declare type ExtractByType<T extends { type: any }, K extends T['type']> = Extract<T, { type: K }>;
