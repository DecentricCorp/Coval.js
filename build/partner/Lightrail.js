"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LR = require("lightrail-client");
var Lightrail = /** @class */ (function () {
    function Lightrail(options) {
        this.client = LR;
        if (options) {
            LR.configure(options || {});
        }
    }
    Lightrail.prototype.ContactParams = function (firstName, lastName, email, userSuppliedId) {
        return {
            userSuppliedId: userSuppliedId || this.GenerateID(),
            email: email,
            firstName: firstName,
            lastName: lastName
        };
    };
    Lightrail.prototype.CreateContact = function (contact) {
        return this.client.contacts.createContact(contact);
    };
    Lightrail.prototype.GenerateID = function () {
        return "testID";
    };
    return Lightrail;
}());
exports.Lightrail = Lightrail;
//# sourceMappingURL=Lightrail.js.map