import { Envelope } from "./transport/Envelope";
import { Dat } from "./transport/Dat";
import { Multichain } from "./transport/Multichain";
import { Unloq } from "./partner/Unloq";
import { Changely } from "./partner/Changely";
import { Shapeshift } from "./partner/Shapeshift";
import { Vocal } from "./Vocal";
import { Emblem } from "./Emblem";
import { Lightrail } from "./partner/Lightrail";
import { Agent } from './Agent';
/**
 * Coval main export
 *
 * @export
 * @class Coval
 */
export declare class Coval {
    Secure: any;
    Partner: Partner;
    Transport: Transport;
    Vocal: typeof Vocal;
    Emblem: typeof Emblem;
    Agent: typeof Agent;
}
/**
 * Partners of Coval
 *
 * @export
 * @class Partner
 */
export declare class Partner {
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
export declare class Transport {
    Envelope: typeof Envelope;
    Dat: typeof Dat;
    Multichain: typeof Multichain;
}
