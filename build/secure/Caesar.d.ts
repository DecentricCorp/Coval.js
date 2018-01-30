export declare class Caesar {
    constructor();
    CreatePrivate(): any;
    CreateRandom(): any;
    CreateKtsSigner(threshold: number, key?: any): any;
    CreateKtsVerifier(pubKey: any): any;
    CreateXtsEncrypter(key: any): XtsEncryptor;
    CreateXtsDecrypter(key: any): XtsDecrypter;
}
export declare class XtsEncryptor {
    encrypter: any;
    constructor(key: any);
    write(buffer: any, cb: any): void;
}
export declare class XtsDecrypter {
    decrypter: any;
    private decryptedChunks;
    constructor(key: any);
    registeredActivity: boolean;
    Activity(msgBufferLength: any, cb: any): void;
    write(buffer: any, msgBufferLength: number, cb: any): void;
}
