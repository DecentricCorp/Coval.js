"use strict"
import * as secrets from "secrets.js-grempe"
import { Envelope } from "../transport/Envelope"
export module Shamir {
    export class Key {
        constructor() { }
        key: string
        shares: string[]
        
        public GetKey(length?) {
            let _envelope = new Envelope()
            if (!this.key) {
                this.key = secrets.random(length || 512)
            } else {
                _envelope.AddError("Key accessed twice!")
            }
            _envelope.AddValue(this.key)
            return _envelope
        }

        public CreateShares(count: number, threshold: number, length?) {
            if (!this.key) {
                this.GetKey(length || 512)
            }
            let shares = secrets.share(this.key, count, threshold)
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
