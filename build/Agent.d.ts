export declare class Agent<B> implements IAgent {
    user: any;
    constructor(_UserType: any, IdentityType?: any, Opts?: any);
    CallServerless(target: any, opts: any): void;
}
export interface IAgent {
    CallServerless(target: any, opts: any): any;
}
