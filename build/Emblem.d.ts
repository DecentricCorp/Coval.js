import { DatNode } from "./transport/Dat";
import { Envelope } from "./transport/Envelope";
export declare class Emblem {
    private datNodes;
    claimed: boolean;
    AddDatNode(dat: DatNode): Envelope;
    findDatOfType(type: string): DatNode;
    HasRequiredDats(): boolean;
}
