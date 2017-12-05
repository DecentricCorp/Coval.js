"use strict"

import * as UserLib from "../base/User"

export class Dat<B> {
    public user: UserLib.IUser
    constructor(UserType) {
        if (UserType){
            this.user = this.As(UserType)
        } else {
            this.user = new UserLib.User()
        }
    }
    
    As<UserType extends UserLib.User>(UserObject: new () => UserType): UserType {
        return new UserObject()
    }

}