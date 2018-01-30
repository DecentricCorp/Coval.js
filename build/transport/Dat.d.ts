import * as UserLib from "../base/User";
export declare class Dat<B> {
    destination: string;
    network: any;
    src: string;
    dat: any;
    user: UserLib.IUser;
    constructor(_UserType: any);
    Share(sharePath: string, callback: any, ignores?: string[]): void;
    Download(destinationPath: string, key: any, callback: any): any;
}
