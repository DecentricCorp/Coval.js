/// <reference types="node" />
import * as crypto from 'crypto';
export declare class Diffie {
    dh: crypto.DiffieHellman;
    keys: any;
    constructor(strength?: any, prime?: any, generator?: any, key?: any);
    GetPubKey(): Buffer;
    GetPrime(): Buffer;
    GetGenerator(): Buffer;
    GetPrivateKey(): Buffer;
    GetSharedSecret(pubkey: any): Buffer;
    Serialize(): {
        pubkey: Buffer;
        privkey: Buffer;
        prime: Buffer;
        generator: Buffer;
    };
}
