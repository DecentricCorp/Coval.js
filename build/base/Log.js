"use strict";
exports.__esModule = true;
var Log = /** @class */ (function () {
    /**
     * Creates an instance of Log.
     * @param {string} message
     * @memberof Log
     */
    function Log(message) {
        this.message = message;
        this.message = message;
    }
    return Log;
}());
exports.Log = Log;
var Logs = /** @class */ (function () {
    function Logs() {
        this.logs = [];
    }
    Logs.prototype.Logs = function () {
        return this.logs;
    };
    Logs.prototype.HasLogs = function () {
        return this.logs.length > 0;
    };
    /**
     * Internal because Error interface is
     * @param log
     */
    Logs.prototype._internalAddError = function (log) {
        this.logs.push(log);
    };
    Logs.prototype.AddError = function (log) {
        this._internalAddError(new Log(log));
    };
    return Logs;
}());
exports.Logs = Logs;
