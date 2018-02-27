import { DatNode } from "./transport/Dat";
import { Envelope } from "./transport/Envelope";
export declare class Emblem {
    private datNodes;
    claimed: boolean;
    AddDatNode(key: string, dat: DatNode): Envelope;
    HasRequiredDats(): boolean;
}
