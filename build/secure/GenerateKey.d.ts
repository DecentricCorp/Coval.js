import * as bitcoin from 'bitcoinjs-lib';
export declare class GenerateKey {
    GenerateRandomKeyPair(rng: any, coin?: any): bitcoin.ECPair;
    CalculateBip32FromSeed(seed: any, coin: any): any;
    CalculateBip32FromPhrase(phrase: any, coin: any): any;
    DeriveBip44(root: any, coin: any, count: any, cb: any): void;
    GetAllAddresses(seed: any, cb: any): void;
}
