"use strict"
import * as secrets from "secrets.js-grempe"
import { Envelope } from "./Envelope"
export module Shamir {
    export class Key {
        constructor() { }
        key: string
        envelope: Envelope = new Envelope()
        public GetKey() {
            if (!this.key) {
                this.key = secrets.random(512)
            } else {
                this.envelope.AddError("Key accessed twice!")
            }
            this.envelope.AddValue(this.key)
            return this.envelope
        }
    }
}
