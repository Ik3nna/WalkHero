declare module '*.png' {
    const value: any;
    export = value;
}

declare module 'base-64' {
    const value: {
      decode: (input: string) => string;
      encode: (input: string) => string;
    };
    export = value;
}
  