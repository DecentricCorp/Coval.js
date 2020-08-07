"use strict"
import {Envelope} from "../transport/Envelope"
export class Protected {
    Value: () => Envelope;
    constructor(value: any) {
        var privateValue = value;

        this.Value = function () {
            var envelope = new Envelope()
            envelope.AddValue(privateValue)
            if (!privateValue) {
                envelope.AddError("Self destructed!")
            }
            privateValue = null
            return envelope
        }
    }
}