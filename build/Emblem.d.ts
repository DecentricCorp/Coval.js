import { Dat } from "./transport/Dat";
import { IUser } from './base/User';
import { Envelope } from "./transport/Envelope";
export declare class Emblem {
    dats: Array<Dat<IUser>>;
    claimed: boolean;
    /**
     * @deprecated
     */
    AddDat(dat: Dat<IUser>): Envelope;
    /**
     * @deprecated
     */
    HasRequiredDats(): boolean;
}
