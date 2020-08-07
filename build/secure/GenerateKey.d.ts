export declare class GenerateKey {
    GenerateRandomKeyPair(rng: any, coin?: any): any;
    CalculateBip32FromSeed(seed: any, coin: any): any;
    CalculateBip32FromPhrase(phrase: any, coin: any): any;
    DeriveBip44(root: any, coin: any, count: any, cb: any): void;
    GetAllAddresses(phrase: any, cb: any): void;
}
