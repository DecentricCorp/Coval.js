import { Protected } from "./secure/Protected";
import { Mnemonic } from "./secure/Mnemonic";
import { Envelope } from "./transport/Envelope";
import { Emblem } from "./Emblem";
import { HDKey } from "./secure/HDKey";
import { Agent } from './Agent';
import { BaseError } from './base/Error';
import { Log } from './base/Log';
import { Msgs } from './base/Msgs';
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
    Emblem: typeof Emblem;
    Agent: typeof Agent;
    Error: typeof BaseError;
    Log: typeof Log;
    Msgs: typeof Msgs;
    User: typeof User;
}
/**
 * Coval Secure Class
 *
 * @export
 * @class Secure
 */
export declare class Secures {
    Protected: typeof Protected;
    Mnemonic: typeof Mnemonic;
    HDKey: typeof HDKey;
    ManyKeys: typeof ManyKeys;
}
/**
 * Partners of Coval
 *
 * @export
 * @class Partner
 */
export declare class Partners {
}
/**
 * Coval Transport Class
 *
 * @export
 * @class Transport
 */
export declare class Transports {
    Envelope: typeof Envelope;
}
