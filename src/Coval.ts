"use strict"
import {Protected} from "./secure/Protected"
import {Mnemonic} from "./secure/Mnemonic"
import {Shamir} from "./secure/Shamir"
import {Diffie} from "./secure/Diffie"
import {Envelope} from "./transport/Envelope"
import {Dat} from "./transport/Dat"
import {Multichain} from "./transport/Multichain"
/**
 * Coval Secure Class
 * 
 * @export
 * @class Secure
 */
export class Secure {
    public Shamir = Shamir
    public Protected = Protected
    public Diffie = Diffie
    public Mnemonic = Mnemonic
}
/**
 * Coval Transport Class
 * 
 * @export
 * @class Transport
 */
export class Transport {
    public Envelope = Envelope
    public Dat = Dat
    public Multichain = Multichain
}
