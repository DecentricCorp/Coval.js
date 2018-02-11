"use strict"

import * as UserLib from "./base/User"
import { User, IUser, UserType, IEncryptionUser } from './base/User';
export class Agent<B> implements IAgent {
    
    public user
    constructor(_UserType, IdentityType?, Opts?) {
        
        if (_UserType) {
            if (IdentityType) {
                this.user = UserLib.As(_UserType, IdentityType, Opts)
            } else {
                this.user = UserLib.As(_UserType)
            }
        } else {
            this.user = new UserLib.User(UserType.Generic)
        }
    }

    CallServerless(target: any, opts: any) {
        throw new Error("Method not implemented.");
    }
}

export interface IAgent {
    CallServerless(target, opts)
}