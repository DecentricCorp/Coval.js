export declare class HDKey {
    CreateNamespacedHDKey(ns: string, sha256Password?: string, plainTextPassword?: string, walletPath?: number): any;
    DecodeKey(encrypted: string, sha256Password?: string, plainTextPassword?: string, walletPath?: number): any;
    StandardHDKey(walletPath: number, cb: any): any;
    MakeNamespace(req: any): any;
    MakeWalletFromNs(ns: string): any;
    CreateKeysFromEncrypted(encrypted: string): {
        derived: any;
        wif: any;
        pk: any;
    };
    DeriveKeyWif(fromKey: any, index: number): {
        derived: any;
        wif: any;
        pk: any;
    };
}
