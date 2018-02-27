"use strict"
import { DatNode } from "./transport/Dat";
import { Envelope } from "./transport/Envelope";

export class Emblem {

    private datNodes: {[key: string]: DatNode} = {}
    public claimed: boolean = false

    public AddDatNode(key:string, dat: DatNode): Envelope {
        var envelope = new Envelope()
        let found = this.datNodes[key]
        if (found) {
            envelope.AddError("Dat of this type already exists")
        } else {
            this.datNodes[key] = dat
            envelope.AddValue("Sucessfully added dat")
        }
        envelope.AddValue("Sucessfully added dat")
        return envelope
    }

    public HasRequiredDats() {
        return Object.keys(this.datNodes).length > 1
    }



}