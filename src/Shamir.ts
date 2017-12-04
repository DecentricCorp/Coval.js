"use strict"
import * as secrets from "secrets.js-grempe"
import { Envelope } from "./Envelope"
export module Shamir {
    export class Key {
        constructor() { }
        key: string
        shares: string[]
        
        public GetKey() {
            let envelope = new Envelope()
            if (!this.key) {
                this.key = secrets.random(512)
            } else {
                envelope.AddError("Key accessed twice!")
            }
            envelope.AddValue(this.key)
            return envelope
        }

        public CreateShares() {
            this.GetKey()
            let shares = secrets.share(this.key, 2, 2)
            let envelope = new Envelope()
            envelope.AddValue(shares)
            return envelope
        }

        public CombineShares(shares: string[]) {
            let combined = secrets.combine( shares )
            let envelope = new Envelope()
            envelope.AddValue(combined)
            return envelope
        }

    }
}
