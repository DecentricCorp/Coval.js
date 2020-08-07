"use strict"
import * as LR from "lightrail-client"
import { CreateContactParams } from "lightrail-client/dist/params";

export class Lightrail {
    public client
    constructor(options?: Partial<LR.LightrailOptions>){
        this.client = LR
        if (options) {
            LR.configure(options || {})
        }
    }

    public ContactParams(firstName, lastName, email, userSuppliedId? ) : CreateContactParams {
        return {
            userSuppliedId: userSuppliedId || this.GenerateID(),
            email: email,
            firstName: firstName,
            lastName: lastName
          }
    }

    public CreateContact(contact: CreateContactParams) {
        return this.client.contacts.createContact(contact)
    }

    GenerateID() {
        return "testID"
    }
}