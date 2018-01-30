import { Protected } from "./secure/Protected";
import { Mnemonic } from "./secure/Mnemonic";
import { Shamir } from "./secure/Shamir";
import { Diffie } from "./secure/Diffie";
import { Envelope } from "./transport/Envelope";
import { Dat } from "./transport/Dat";
import { Multichain } from "./transport/Multichain";
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
    Dat: typeof Dat;
    Multichain: typeof Multichain;
}
