export interface IIdentity {
    type: string;
}
export declare class Unloq implements IIdentity {
    key: any;
    type: string;
    Api: any;
    client: any;
    constructor(key?: any);
    config: {
        port: number;
        sessionLife: number;
        unloq: {
            key: any;
        };
    };
    Authenticate(email: string, callback: any): void;
    Authorize(unloqId: any, callback: any): void;
    GetEncryptionKey(unloqId: any, callback: any): void;
    ValidateToken(token: any, callback: any): void;
    genid(): string;
}
