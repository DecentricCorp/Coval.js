"use strict"
import { DatNode } from "./transport/Dat";
import { Envelope } from "./transport/Envelope";

export class Emblem {

    private datNodes: DatNode[] = []
    public claimed: boolean = false

    public AddDatNode(dat: DatNode): Envelope {
        var envelope = new Envelope()
        if (this.findDatOfType(dat.getID())) {
            envelope.AddError("Dat of this type already exists")
        } else {
            this.datNodes.push(dat)
            envelope.AddValue("Sucessfully added dat")
        }
        envelope.AddValue("Sucessfully added dat")
        return envelope
    }

    public findDatOfType(type:string):DatNode {
        let found = this.datNodes.filter((d) => {return d.getID() === type})
        return found.length > 0 ? found[0] : null
    }

    public HasRequiredDats() {
        return !!this.findDatOfType('client') && !!this.findDatOfType('server')
    }

}