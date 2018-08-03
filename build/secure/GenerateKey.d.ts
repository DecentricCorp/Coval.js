import * as bitcoin from 'bitcoinjs-lib';
export declare class GenerateKey {
    GenerateRandomKeyPair(rng: any): bitcoin.ECPair;
    CalculateBip32(seed: any, coin: any): {
        pk: any;
        pubkey: any;
        address: any;
    };
}
