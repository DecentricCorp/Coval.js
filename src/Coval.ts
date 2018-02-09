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
import {Caesar} from "./secure/Caesar"
import {HDKey} from "./secure/HDKey"
import {Pre} from "./secure/Pre"
import { Lightrail } from "./partner/Lightrail"
import { Agent } from './Agent'
import { BaseError } from './base/Error'
import { Log } from './base/Log';
import { Msgs } from './base/Msgs';
import { PyShell } from './base/PyShell';
import * as User from './base/User';
import { ManyKeys } from './secure/ManyKeys';
/**
 * Coval main export
 * 
 * @export
 * @class Coval
 */
export class Coval {
    public Secure = new Secures()
    public Partner = new Partners()
    public Transport = new Transports()
    public Vocal = Vocal
    public Emblem = Emblem
    public Agent = Agent
    public Error = BaseError
    public Log = Log
    public Msgs = Msgs
    public PyShell = PyShell
    public User = User
}

/**
 * Coval Secure Class
 * 
 * @export
 * @class Secure
 */
export class Secures {
    public Shamir = Shamir
    public Protected = Protected
    public Diffie = Diffie
    public Mnemonic = Mnemonic
    public Caesar = Caesar
    public HDKey = HDKey
    public Pre = Pre
    public ManyKeys = ManyKeys
}
/**
 * Partners of Coval
 * 
 * @export
 * @class Partner
 */
export class Partners {
    public Unloq = Unloq
    public Shapeshift = Shapeshift
    public Changely = Changely
    public Lightrail = Lightrail
}
/**
 * Coval Transport Class
 * 
 * @export
 * @class Transport
 */
export class Transports {
    public Envelope = Envelope
    public Dat = Dat
    public Multichain = Multichain
}
