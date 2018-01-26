"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserLib = require("./base/User");
var Agent = /** @class */ (function () {
    function Agent(UserType, IdentityType, Opts) {
        if (UserType) {
            if (IdentityType) {
                this.user = UserLib.As(UserType, IdentityType, Opts);
            }
            else {
                this.user = UserLib.As(UserType);
            }
        }
        else {
            this.user = new UserLib.User();
        }
    }
    return Agent;
}());
exports.Agent = Agent;
