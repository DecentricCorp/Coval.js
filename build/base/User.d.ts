import { IIdentity } from '../partner/Unloq';
import * as UtilLib from "../Utils";
import { Multichain } from '../transport/Multichain';
export declare class User implements IUser {
    type: UserType;
    constructor(_UserType?: UserType, Opts?: any);
}
export declare class IdentityProvider implements IIdentity {
    type: string;
    constructor(_type?: string);
}
export declare function As<DynamicUserType extends User>(UserObject: new (IdentityType?, Opts?) => DynamicUserType, IdentityType?: any, Opts?: any): DynamicUserType;
export interface IUser {
    type: UserType;
}
export interface IEncryptionUser {
    Authenticate(token: any): any;
    Generate(size?: any): any;
    Split(count: number, threshold: number, size?: any): any;
    Combine(shares: any): any;
    SetKey(key: any): any;
}
export interface IMultichainAdmin {
    IssueEmblemAsset(to: any, assetName: any): any;
}
export declare class Client extends User {
    constructor();
}
export declare class Server extends User implements IEncryptionUser, IMultichainAdmin {
    multichain: Multichain;
    key: any;
    utils: UtilLib.Utils;
    identity_type: any;
    auth_token: any;
    constructor(IdentityType?: any, Opts?: any);
    IssueEmblemAsset(to: any, assetName: any): void;
    SetKey(key: any): void;
    GetKey(): any;
    Authenticate(token: any): void;
    Generate(size?: any): any;
    Split(count: number, threshold: number, size?: any): any;
    Combine(shares: any): any;
}
export declare class Identity<B> extends User {
    identity: any;
    constructor(IdentityType: any, Opts: any);
    As<IdentityType extends IdentityProvider>(IdentityObject: new (Opts) => IdentityType, Opts?: any): IdentityType;
}
export declare enum UserType {
    Server = 0,
    Identity = 1,
    Client = 2,
    Generic = 3,
}
