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
var Error_1 = require("./Error");
var Log_1 = require("./Log");
"use strict";
var Msgs = /** @class */ (function (_super) {
    __extends(Msgs, _super);
    function Msgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Msgs.prototype.EnvLogs = function () {
        return new Log_1.Logs();
    };
    return Msgs;
}(Error_1.Errors));
exports.Msgs = Msgs;
