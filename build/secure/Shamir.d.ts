import { Envelope } from "../transport/Envelope";
export declare module Shamir {
    class Key {
        constructor();
        key: string;
        shares: string[];
        GetKey(length?: any): Envelope;
        CreateShares(count: number, threshold: number, length?: any): Envelope;
        CombineShares(shares: string[]): Envelope;
    }
}
