"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Protected_1 = require("./secure/Protected");
var Mnemonic_1 = require("./secure/Mnemonic");
//import {Shamir} from "./secure/Shamir"
//import {Diffie} from "./secure/Diffie"
var Envelope_1 = require("./transport/Envelope");
//import {DatNode} from "./transport/Dat"
//import {Multichain} from "./transport/Multichain"
//import {Unloq} from "./partner/Unloq"
//import {Changely} from "./partner/Changely"
//import {Shapeshift} from "./partner/Shapeshift"
//import {Vocal} from "./Vocal"
var Emblem_1 = require("./Emblem");
//import {Caesar} from "./secure/Caesar"
var HDKey_1 = require("./secure/HDKey");
//import {Pre} from "./secure/Pre"
//import { Lightrail } from "./partner/Lightrail"
var Agent_1 = require("./Agent");
var Error_1 = require("./base/Error");
var Log_1 = require("./base/Log");
var Msgs_1 = require("./base/Msgs");
//import { PyShell } from './base/PyShell';
var User = require("./base/User");
var ManyKeys_1 = require("./secure/ManyKeys");
/**
 * Coval main export
 *
 * @export
 * @class Coval
 */
var Coval = /** @class */ (function () {
    function Coval() {
        this.Secure = new Secures();
        this.Partner = new Partners();
        this.Transport = new Transports();
        //public Vocal = Vocal
        this.Emblem = Emblem_1.Emblem;
        this.Agent = Agent_1.Agent;
        this.Error = Error_1.BaseError;
        this.Log = Log_1.Log;
        this.Msgs = Msgs_1.Msgs;
        //public PyShell = PyShell
        this.User = User;
    }
    return Coval;
}());
exports.Coval = Coval;
/**
 * Coval Secure Class
 *
 * @export
 * @class Secure
 */
var Secures = /** @class */ (function () {
    function Secures() {
        //public Shamir = Shamir
        this.Protected = Protected_1.Protected;
        //public Diffie = Diffie
        this.Mnemonic = Mnemonic_1.Mnemonic;
        //public Caesar = Caesar
        this.HDKey = HDKey_1.HDKey;
        //public Pre = Pre
        this.ManyKeys = ManyKeys_1.ManyKeys;
    }
    return Secures;
}());
exports.Secures = Secures;
/**
 * Partners of Coval
 *
 * @export
 * @class Partner
 */
var Partners = /** @class */ (function () {
    function Partners() {
    }
    return Partners;
}());
exports.Partners = Partners;
/**
 * Coval Transport Class
 *
 * @export
 * @class Transport
 */
var Transports = /** @class */ (function () {
    function Transports() {
        this.Envelope = Envelope_1.Envelope;
        //public DatNode = DatNode
        //public Multichain = Multichain
    }
    return Transports;
}());
exports.Transports = Transports;
//# sourceMappingURL=Coval.js.map