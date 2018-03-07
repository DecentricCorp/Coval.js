export declare class Multichain {
    address: string;
    asset: string;
    permissions: string[];
    multichain: {
        [x: string]: any;
    };
    Utils: any;
    constructor(address?: string, connection?: MultichainConnection, asset?: string, permissions?: string[]);
    makeConnectionFromEnv(): MultichainConnection;
    makeConnectedMultichainObject(): Multichain;
    Info(callback: (error: any, result: any) => void): void;
    Connect(connection: MultichainConnection): void;
    Streams(callback: (error: any, result: any) => void): void;
    StreamItemsByKey(streamName: string, key: string, callback: (error: any, result: any) => void): void;
    StreamItemsByPublisher(streamName: any, publisherAddress: any, callback: any): void;
    GrantPermissionToAddress(addresses: any, permissions: any, callback: any): void;
    RevokePermissionToAddress(address: any, permissions: any, callback: any): void;
    ImportAddress(address: any, name: any, callback: any): void;
    ImportPrivKey(key: any, callback: any): void;
    SendSignedTransaction(signed: any, callback: any): void;
    CreateAndSignSend(from: any, to: any, asset: any, qty: any, callback: any): void;
    SignRaw(from: any, hex: any, callback: any): void;
    GetAssetBalance(address: any, asset: any, callback: any): void;
    SendAssetFrom(from: any, to: any, amount: any, asset: any, callback: any): void;
    Issue(to: any, name: any, qty: any, callback: any): void;
    IssueMore(to: any, name: any, qty: any, callback: any): void;
    CreateExchange(from: any, asset: any, asking: any, callback: any): void;
    FinalizeExchange(hex: any, txid: any, vout: any, assets: any, callback: any): void;
    PrepareUnlockFrom(from: any, assets: any, callback: any): void;
    PrepareUnlock(assets: any, callback: any): void;
    IssueEmblem(to: any, assetName: any, callback: any): void;
    _StreamItems(error: any, items: any, callback: any): any;
    _elementValueCompute(items: any): any;
}
export declare class MultichainConnection {
    port: Number;
    host: string;
    user: string;
    pass: string;
    constructor(port: Number, host: string, user: string, pass: string);
}
