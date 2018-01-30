"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log(message) {
        this.message = message;
        this.message = message;
    }
    return Log;
}());
exports.Log = Log;
var Logs = /** @class */ (function () {
    function Logs() {
        this.env_logs = [];
    }
    Logs.prototype._Logs = function () {
        return this.env_logs;
    };
    Logs.prototype.HasLogs = function () {
        return this.env_logs.length > 0;
    };
    Logs.prototype._internalAddError = function (_log) {
        this.env_logs.push(_log);
    };
    Logs.prototype.AddError = function (_log) {
        this._internalAddError(new Log(_log));
    };
    return Logs;
}());
exports.Logs = Logs;
