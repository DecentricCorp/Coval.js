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
var UtilLib = require("../Utils");
var Shamir_1 = require("../secure/Shamir");
var Multichain_1 = require("../transport/Multichain");
var User = /** @class */ (function () {
    function User(_UserType, Opts) {
        this.type = _UserType;
    }
    return User;
}());
exports.User = User;
var IdentityProvider = /** @class */ (function () {
    function IdentityProvider(_type) {
        this.type = _type || "generic";
    }
    return IdentityProvider;
}());
exports.IdentityProvider = IdentityProvider;
function As(UserObject, IdentityType, Opts) {
    return new UserObject(IdentityType, Opts);
}
exports.As = As;
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        return _super.call(this, UserType.Client) || this;
    }
    return Client;
}(User));
exports.Client = Client;
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server(IdentityType, Opts) {
        var _this = _super.call(this, UserType.Server) || this;
        if (IdentityType) {
            _this.identity_type = IdentityType;
        }
        _this.utils = new UtilLib.Utils();
        _this.key = new Shamir_1.Shamir.Key();
        return _this;
    }
    Server.prototype.IssueEmblemAsset = function (to, assetName) {
        var multichain = new Multichain_1.Multichain();
        return multichain.IssueEmblem(to, assetName, function (err, tx) {
            return tx;
        });
    };
    Server.prototype.SetKey = function (key) {
        this.key.SetKey(key);
    };
    Server.prototype.Authenticate = function (token) {
        this.auth_token = token;
    };
    Server.prototype.Generate = function (size) {
        return this.key.GetKey(size || 256);
    };
    Server.prototype.Split = function (count, threshold, size) {
        return this.key.CreateShares(count, threshold, size);
    };
    Server.prototype.Combine = function (shares) {
        return this.key.CombineShares(shares);
    };
    return Server;
}(User));
exports.Server = Server;
var Identity = /** @class */ (function (_super) {
    __extends(Identity, _super);
    function Identity(IdentityType, Opts) {
        var _this = _super.call(this, UserType.Identity) || this;
        if (IdentityType) {
            _this.identity = _this.As(IdentityType, Opts);
        }
        return _this;
    }
    Identity.prototype.As = function (IdentityObject, Opts) {
        return new IdentityObject(Opts);
    };
    return Identity;
}(User));
exports.Identity = Identity;
var UserType;
(function (UserType) {
    UserType[UserType["Server"] = 0] = "Server";
    UserType[UserType["Identity"] = 1] = "Identity";
    UserType[UserType["Client"] = 2] = "Client";
    UserType[UserType["Generic"] = 3] = "Generic";
})(UserType = exports.UserType || (exports.UserType = {}));
//# sourceMappingURL=User.js.map