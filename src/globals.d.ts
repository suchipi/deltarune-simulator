declare namespace NodeJS {
  interface Require {
    context: (
      directory: string,
      useSubDirectories?: boolean,
      regExp?: RegExp,
      mode?: "sync",
    ) => NodeJS.Require & {
      resolve: (request: string) => number;
      keys: () => Array<string>;
      id: number;
    };
  }
}
