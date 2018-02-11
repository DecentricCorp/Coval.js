"use strict"
import { IIdentity } from '../partner/Unloq';
import * as UtilLib from "../Utils"
import { Shamir } from '../secure/Shamir'
import { Multichain } from '../transport/Multichain';


export class User implements IUser {
    type: UserType
    constructor(_UserType?: UserType, Opts?) {
        this.type = _UserType
    }    
}

export class IdentityProvider implements IIdentity {
    type: string
    constructor(_type?: string) {
        this.type = _type || "generic"
    }
    
}

export function As<DynamicUserType extends User>(UserObject: new (IdentityType?, Opts?) => DynamicUserType, IdentityType?, Opts?): DynamicUserType {
    return new UserObject(IdentityType, Opts)
}

export interface IUser {
    type: UserType
}

export interface IEncryptionUser {
    Authenticate(token)
    Generate(size?)
    Split(count: number, threshold: number, size?)
    Combine(shares)
    SetKey(key)
}

export interface IMultichainAdmin {
    IssueEmblemAsset(to, assetName)
}

export class Client extends User {
    constructor(){
        super(UserType.Client)
    }
}

export class Server extends User implements IEncryptionUser, IMultichainAdmin {
    
    key
    utils: UtilLib.Utils;
    identity_type: any;
    auth_token: any;
    
    constructor(IdentityType?, Opts?){
        super(UserType.Server)
        if (IdentityType) {
            this.identity_type = IdentityType
        }
        this.utils = new UtilLib.Utils()
        this.key = new Shamir.Key()
    }

    IssueEmblemAsset(to: any, assetName: any) {
        var multichain = new Multichain()
            return multichain.IssueEmblem(to, assetName, function(err, tx){
                return tx
            })
    }

    SetKey(key) {
        this.key.SetKey(key)
    }

    Authenticate(token) {
        this.auth_token = token
    }

    Generate(size?) {
        return this.key.GetKey(size || 256)
    }

    Split(count: number, threshold: number, size?) {
        return this.key.CreateShares(count, threshold, size)
    }

    Combine(shares) {
        return this.key.CombineShares(shares)
    }
}

export class Identity<B> extends User {
    identity
    constructor(IdentityType, Opts){
        super(UserType.Identity)
        if (IdentityType) {
            this.identity = this.As(IdentityType, Opts)
        }
    }

    As<IdentityType extends IdentityProvider>(IdentityObject: new (Opts) => IdentityType, Opts?): IdentityType {
        return new IdentityObject(Opts)
    }
}

export enum UserType {
    Server = 0,
    Identity,
    Client,
    Generic
}


