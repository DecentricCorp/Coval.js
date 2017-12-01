"use strict"
import * as _Envelope from "./Envelope"
export class Protected {
    Value: () => _Envelope.Envelope;
    constructor(value: any) {
        var privateValue = value;

        this.Value = function () {
            var envelope = new _Envelope.Envelope()
            envelope.AddValue(privateValue)
            if (!privateValue) {
                envelope.AddError("Self destructed!")
            }
            privateValue = null
            return envelope
        }
    }
}