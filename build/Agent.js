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
    Agent.prototype.Authenticate = function (token) {
        if (this.user.type == User_1.UserType.Server) {
            return this.user.Authenticate(token);
        }
        else {
            throw new Error("Method not implemented.");
        }
    };
    Agent.prototype.Generate = function (size) {
        if (this.user.type == User_1.UserType.Server) {
            return this.user.Generate(size);
        }
        else {
            throw new Error("Method not implemented.");
        }
    };
    Agent.prototype.Split = function (count, threshold, size) {
        if (this.user.type == User_1.UserType.Server) {
            return this.user.Split(count, threshold, size);
        }
        else {
            throw new Error("Method not implemented.");
        }
    };
    Agent.prototype.Combine = function (shares) {
        if (this.user.type == User_1.UserType.Server) {
            return this.user.Combine(shares);
        }
        else {
            throw new Error("Method not implemented.");
        }
    };
    return Agent;
}());
exports.Agent = Agent;
//# sourceMappingURL=Agent.js.map