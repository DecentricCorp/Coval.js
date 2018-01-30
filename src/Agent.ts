"use strict"

import * as UserLib from "./base/User"
import { User, IUser, UserType, IEncryptionUser } from './base/User';

export class Agent<B> implements IEncryptionUser {
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

    Authenticate(token: any) {
        if (this.user.type == UserType.Server) {
            return this.user.Authenticate(token)
        } else {
            throw new Error("Method not implemented.");
        }
    }
    Generate(size?: any) {
        if (this.user.type == UserType.Server) {
            return this.user.Generate(size)
        } else {
            throw new Error("Method not implemented.");
        }
    }
    Split(count: number, threshold: number, size?: any) {
        if (this.user.type == UserType.Server) {
            return this.user.Split(count, threshold, size)
        } else {
            throw new Error("Method not implemented.");
        }
    }
    Combine(shares: any) {
        if (this.user.type == UserType.Server) {
            return this.user.Combine(shares)
        } else {
            throw new Error("Method not implemented.");
        }
    }
}