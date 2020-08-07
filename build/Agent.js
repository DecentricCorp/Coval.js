"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserLib = require("./base/User");
var User_1 = require("./base/User");
var Agent = /** @class */ (function () {
    function Agent(_UserType, IdentityType, Opts) {
        if (_UserType) {
            if (IdentityType) {
                this.user = UserLib.As(_UserType, IdentityType, Opts);
            }
            else {
                this.user = UserLib.As(_UserType);
            }
        }
        else {
            this.user = new UserLib.User(User_1.UserType.Generic);
        }
    }
    Agent.prototype.CallServerless = function (target, opts) {
        throw new Error("Method not implemented.");
    };
    return Agent;
}());
exports.Agent = Agent;
//# sourceMappingURL=Agent.js.map