import { IIdentity } from '../partner/Unloq';
"use strict"
export class User implements IUser {
    type: string
    constructor(_type?: string) {
        this.type = _type || "generic"
    }    
}

export class IdentityProvider implements IIdentity {
    type: string
    constructor(_type?: string) {
        this.type = _type || "generic"
    }
    
}

export function As<UserType extends User>(UserObject: new (IdentityType, Opts) => UserType, IdentityType?, Opts?): UserType {
    return new UserObject(IdentityType, Opts)
}

export interface IUser {
    type: string
}

export class Client extends User {
    constructor(){
        super("client")
    }    
}

export class Server extends User {
    constructor(){
        super("server")
    }
}

export class Identity<B> extends User {
    identity
    constructor(IdentityType, Opts){
        super("identity")
        if (IdentityType) {
            this.identity = this.As(IdentityType, Opts)
        }
    }

    As<IdentityType extends IdentityProvider>(IdentityObject: new (Opts) => IdentityType, Opts?): IdentityType {
        return new IdentityObject(Opts)
    }
}


