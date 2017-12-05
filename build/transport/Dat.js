"use strict";
exports.__esModule = true;
var UserLib = require("../base/User");
var Dat = /** @class */ (function () {
    function Dat(UserType) {
        if (UserType) {
            this.user = this.As(UserType);
        }
        else {
            this.user = new UserLib.User();
        }
    }
    Dat.prototype.As = function (UserObject) {
        return new UserObject();
    };
    return Dat;
}());
exports.Dat = Dat;
