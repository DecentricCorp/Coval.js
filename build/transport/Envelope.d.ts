import "../base/Log";
import "../base/Msgs";
import { Msgs } from "../base/Msgs";
export declare class Envelope extends Msgs {
    value: any;
    AddValue(_value: any): void;
    GetValue(): any;
    toString(): {
        value: any;
        errors: any[];
        logs: any[];
    };
}
