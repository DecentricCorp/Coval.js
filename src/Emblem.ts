"use strict"
import { Dat } from "./transport/Dat";
import { IUser } from "./base/User";
import { Envelope } from "./transport/Envelope";


export class Emblem {
    public dats: Array<Dat<IUser>> = []
    public claimed: boolean = false
    /**
     * @deprecated 
     */
    public AddDat(dat: Dat<IUser>): Envelope {
        var envelope = new Envelope()
        let found = this.dats.filter((d) => {return d.user.type === dat.user.type})
        if (found.length > 0) {
            envelope.AddError("Dat of this type already exists")
        } else {
            this.dats.push(dat)
            envelope.AddValue("Sucessfully added dat")
        }
        return envelope
    }

    /**
     * @deprecated 
     */
    public HasRequiredDats() {
        let serverDat = this.dats.filter((d) => {return d.user.type === 'server'})
        let clientDat = this.dats.filter((d) => {return d.user.type === 'client'})
        return serverDat.length > 0 && clientDat.length > 0
    }


    
}