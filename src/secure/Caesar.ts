"use strict"
import * as CaesarLib from 'caesar'
export class Caesar {
    constructor() { }

    public CreatePrivate(){
        return CaesarLib.key.createPrivate()
    }
}