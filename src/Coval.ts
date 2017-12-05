"use strict"
import {Protected} from "./secure/Protected"
import {Mnemonic} from "./secure/Mnemonic"
import {Shamir} from "./secure/Shamir"
import {Diffie} from "./secure/Diffie"
import {Envelope} from "./transport/Envelope"
import {Dat} from "./transport/Dat"
import {Multichain} from "./transport/Multichain"
import {Unloq} from "./partner/Unloq"
import {Changely} from "./partner/Changely"
import {Shapeshift} from "./partner/Shapeshift"
import {Vocal} from "./Vocal"
import {Emblem} from "./Emblem"
/**
 * Coval main export
 * 
 * @export
 * @class Coval
 */
export class Coval {
    public Secure = Secure
    public Partner = Partner
    public Transport = Transport
    public Vocal = Vocal
    public Emblem = Emblem    
}

/**
 * Coval Secure Class
 * 
 * @export
 * @class Secure
 */
class Secure {
    public Shamir = Shamir
    public Protected = Protected
    public Diffie = Diffie
    public Mnemonic = Mnemonic
}
/**
 * Partners of Coval
 * 
 * @export
 * @class Partner
 */
export class Partner {
    public Unloq = Unloq
    public Shapeshift = Shapeshift
    public Changely = Changely
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
