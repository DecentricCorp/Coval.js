export declare class Mnemonic {
    seed: any;
    constructor(seed?: any);
    Generate(strength?: any): any;
    ToSeedHex(phrase: any): any;
    ToEntropy(phrase: any): any;
    Split(quantity?: any, threshold?: any, phrase?: any): any;
    Combine(shares: any): any;
}
