import * as bitcoin from 'bitcoinjs-lib';
export declare class GenerateKey {
    GenerateRandomKeyPair(rng: any, coin?: any): bitcoin.ECPair;
    CalculateBip32(seed: any, coin: any): {
        pk: any;
        pubkey: any;
        address: any;
    };
    CalculateBip32FromPhrase(phrase: any, coin: any): {
        root: any;
        pubkey: any;
        address: any;
        seed: any;
        rootKey: any;
        phrase: any;
        child: any;
    };
}
