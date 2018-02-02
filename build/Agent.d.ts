import { IEncryptionUser } from './base/User';
export declare class Agent<B> implements IEncryptionUser {
    user: any;
    constructor(_UserType: any, IdentityType?: any, Opts?: any);
    SetKey(key: any): any;
    Authenticate(token: any): any;
    Generate(size?: any): any;
    Split(count: number, threshold: number, size?: any): any;
    Combine(shares: any): any;
}
