export declare class ManyKeys {
    seed: any;
    ck: any;
    constructor(seed?: any);
    GenKeys(): any;
    As(type: any, network?: any): any;
    GetAllAddresses(): {};
    GetAllKeys(): {};
    KeyFromWif(wif: any): {
        privateKey: any;
        address: any;
    };
}
