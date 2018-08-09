import { Protected } from "./secure/Protected";
import { Mnemonic } from "./secure/Mnemonic";
import { Shamir } from "./secure/Shamir";
import { Diffie } from "./secure/Diffie";
import { Envelope } from "./transport/Envelope";
import { DatNode } from "./transport/Dat";
import { Multichain } from "./transport/Multichain";
import { GenerateKey } from "./secure/GenerateKey";
import { Unloq } from "./partner/Unloq";
import { Changely } from "./partner/Changely";
import { Shapeshift } from "./partner/Shapeshift";
import { Vocal } from "./Vocal";
import { Emblem } from "./Emblem";
import { Caesar } from "./secure/Caesar";
import { HDKey } from "./secure/HDKey";
import { Pre } from "./secure/Pre";
import { Lightrail } from "./partner/Lightrail";
import { Agent } from './Agent';
import { BaseError } from './base/Error';
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
export declare class Coval {
    Secure: Secures;
    Partner: Partners;
    Transport: Transports;
    Vocal: typeof Vocal;
    Emblem: typeof Emblem;
    Agent: typeof Agent;
    Error: typeof BaseError;
    Log: typeof Log;
    Msgs: typeof Msgs;
    PyShell: typeof PyShell;
    User: typeof User;
}
/**
 * Coval Secure Class
 *
 * @export
 * @class Secure
 */
export declare class Secures {
    Shamir: typeof Shamir;
    Protected: typeof Protected;
    Diffie: typeof Diffie;
    Mnemonic: typeof Mnemonic;
    Caesar: typeof Caesar;
    HDKey: typeof HDKey;
    Pre: typeof Pre;
    ManyKeys: typeof ManyKeys;
    GenerateKey: typeof GenerateKey;
}
/**
 * Partners of Coval
 *
 * @export
 * @class Partner
 */
export declare class Partners {
    Unloq: typeof Unloq;
    Shapeshift: typeof Shapeshift;
    Changely: typeof Changely;
    Lightrail: typeof Lightrail;
}
/**
 * Coval Transport Class
 *
 * @export
 * @class Transport
 */
export declare class Transports {
    Envelope: typeof Envelope;
    DatNode: typeof DatNode;
    Multichain: typeof Multichain;
}
