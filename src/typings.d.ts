declare interface WebpackRequireContext {
  keys(): string[];
  <T>(id: string): T;
}

declare function require(context: WebpackRequireContext): any;
declare namespace require {
  function context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): WebpackRequireContext;
}
