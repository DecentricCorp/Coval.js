"use strict"
export class User implements IUser {
    type: string
    constructor(_type?: string) {
        this.type = _type || "generic"
    }
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

export class Unloq extends User {
    constructor(){
        super("unloq")
    }
}


