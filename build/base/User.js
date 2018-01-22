"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(_type) {
        this.type = _type || "generic";
    }
    return User;
}());
exports.User = User;
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        return _super.call(this, "client") || this;
    }
    return Client;
}(User));
exports.Client = Client;
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server() {
        return _super.call(this, "server") || this;
    }
    return Server;
}(User));
exports.Server = Server;
var Unloq = /** @class */ (function (_super) {
    __extends(Unloq, _super);
    function Unloq() {
        return _super.call(this, "unloq") || this;
    }
    return Unloq;
}(User));
exports.Unloq = Unloq;
