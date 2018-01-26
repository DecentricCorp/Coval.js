"use strict"

import * as UserLib from "./base/User"

export class Agent<B> {
    public user: UserLib.IUser
    constructor(UserType, IdentityType?, Opts?) {
        if (UserType) {
            if (IdentityType) {
                this.user = UserLib.As(UserType, IdentityType, Opts)
            } else {
                this.user = UserLib.As(UserType)
            }
        } else {
            this.user = new UserLib.User()
        }
    }
}