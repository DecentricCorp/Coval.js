import * as LR from "lightrail-client";
import { CreateContactParams } from "lightrail-client/dist/params";
export declare class Lightrail {
    client: any;
    constructor(options?: Partial<LR.LightrailOptions>);
    ContactParams(firstName: any, lastName: any, email: any, userSuppliedId?: any): CreateContactParams;
    CreateContact(contact: CreateContactParams): any;
    GenerateID(): string;
}
