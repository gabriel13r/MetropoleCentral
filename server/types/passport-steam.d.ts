declare module 'passport-discord' {
  import { Strategy as PassportStrategy } from 'passport';
  
  export interface Profile {
    id: string;
    displayName: string;
    _json: {
      avatarfull: string;
      [key: string]: any;
    };
    [key: string]: any;
  }
  
  export interface StrategyOptions {
    returnURL: string;
    realm: string;
    apiKey: string;
  }
  
  export class Strategy extends PassportStrategy {
    constructor(
      options: StrategyOptions,
      verify: (
        identifier: string,
        profile: Profile,
        done: (error: any, user?: any) => void
      ) => void
    );
  }
}