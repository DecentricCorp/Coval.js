"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultichainLib = require("multichain-node");
var UtilLib = require("../Utils");
var HDKeyLib = require("../secure/HDKey");
var Error_1 = require("../base/Error");
var Multichain = /** @class */ (function () {
    function Multichain(address, connection, asset, permissions) {
        this.address = address;
        this.asset = asset;
        this.permissions = permissions;
        this.Utils = new UtilLib.Utils();
        if (connection) {
            this.multichain = MultichainLib(connection);
        }
        else {
            this.multichain = Multichain.makeConnectedMultichainObject();
        }
    }
    Multichain.makeConnectionFromEnv = function () {
        return new MultichainConnection(Number(process.env.MULTICHAINport), process.env.MULTICHAINhost, process.env.MULTICHAINuser, process.env.MULTICHAINpass);
    };
    Multichain.makeConnectedMultichainObject = function () {
        return new Multichain(process.env.MULTICHAINADDRESS, Multichain.makeConnectionFromEnv());
    };
    Multichain.prototype.Info = function (callback) {
        try {
            this.multichain.getInfo(callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.Connect = function (connection) {
        this.multichain = MultichainLib(connection);
    };
    Multichain.prototype.Streams = function (callback) {
        try {
            this.multichain.listStreams(callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.StreamItemsByKey = function (streamName, key, callback) {
        var _this = this;
        try {
            this.multichain.listStreamKeyItems({
                stream: streamName,
                key: key,
                verbose: true
            }, function (error, items) {
                return !!error ? callback(error, null) : _this._StreamItems(null, items, callback);
            });
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.StreamItemsByPublisher = function (streamName, publisherAddress, callback) {
        var _this = this;
        try {
            this.multichain.listStreamPublisherItems({
                stream: streamName,
                address: publisherAddress,
                verbose: true
            }, function (error, items) {
                return !!error ? callback(error, null) : _this._StreamItems(null, items, callback);
            });
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.GrantPermissionToAddress = function (addresses, permissions, callback) {
        try {
            this.multichain.grant({
                addresses: addresses,
                permissions: permissions
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.RevokePermissionToAddress = function (address, permissions, callback) {
        try {
            this.multichain.revoke({
                addresses: address,
                permissions: permissions
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.ImportAddress = function (address, name, callback) {
        try {
            this.multichain.importAddress({
                address: address,
                label: name,
                rescan: false
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.ImportPrivKey = function (key, callback) {
        this.multichain.importPrivKey([key], callback);
    };
    Multichain.prototype.SendSignedTransaction = function (signed, callback) {
        this.multichain.sendRawTransaction([signed.toString("hex")], callback);
    };
    Multichain.prototype.CreateAndSignSend = function (from, to, asset, qty, callback) {
        var rawRequest = {};
        rawRequest[to] = {};
        // TODO: Use promise with async and await instead of callback, to avoid race condition
        rawRequest[to][asset] = function () { return Number(qty); };
        var parent = this;
        parent.multichain.createRawSendFrom([from.address, rawRequest], function (error, raw) {
            parent.SignRaw(from, raw, callback);
        });
    };
    Multichain.prototype.SignRaw = function (from, hex, callback) {
        var HDKey = new HDKeyLib.HDKey();
        from.wif = HDKey.DeriveKeyWif(from, 0);
        var parent = this;
        try {
            parent.multichain.signRawTransaction([hex, [], [from.wif.wif]], callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.GetAssetBalance = function (address, asset, callback) {
        try {
            this.multichain.getAddressBalances({
                minconf: 0,
                address: address
            }, function (error, result) {
                var balance = 0;
                var filtered = result.filter(function (a) { return a.name === asset; });
                if (filtered.length > 0) {
                    balance = filtered[0].qty;
                }
                return callback(null, balance);
            });
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.SendAssetFrom = function (from, to, amount, asset, callback) {
        try {
            this.multichain.sendAssetFrom({
                from: from,
                to: to,
                asset: asset,
                qty: amount
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.Issue = function (to, name, qty, callback) {
        try {
            this.multichain.issue({
                address: to,
                asset: { name: name, open: true },
                qty: qty,
                units: 1
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.IssueMore = function (to, name, qty, callback) {
        try {
            this.multichain.issueMore({
                address: to,
                asset: name,
                qty: qty
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.CreateExchange = function (from, asset, asking, callback) {
        var parent = this;
        var assets = {};
        var ask = {};
        assets[asset] = 1;
        ask[asking] = 1;
        this.PrepareUnlockFrom(from, assets, function (error, unlocks) {
            var payload = { unlocks: unlocks, prepared: '', offer: assets, asking: ask };
            try {
                parent.multichain.createRawExchange({
                    txid: payload.unlocks.txid,
                    vout: payload.unlocks.vout,
                    assets: ask
                }, function (error, raw) {
                    payload.prepared = raw;
                    return callback(error, payload);
                });
            }
            catch (error) {
                callback(new Error_1.MultichainError(error), null);
            }
        });
    };
    Multichain.prototype.FinalizeExchange = function (hex, txid, vout, assets, callback) {
        try {
            this.multichain.completeRawExchange({
                hexstring: hex,
                txid: txid,
                vout: vout,
                assets: assets,
                data: ''
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.PrepareUnlockFrom = function (from, assets, callback) {
        try {
            this.multichain.prepareLockUnspentFrom({
                from: from,
                assets: assets,
                lock: true
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.PrepareUnlock = function (assets, callback) {
        try {
            this.multichain.prepareLockUnspent({
                assets: assets,
                lock: false
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    };
    Multichain.prototype.IssueEmblem = function (to, assetName, callback) {
        this.Issue(to, assetName, 1, callback);
    };
    Multichain.prototype._StreamItems = function (error, items, callback) {
        var itemArray = [];
        if (items && items.length > 0)
            itemArray = this._elementValueCompute(items);
        return callback(error, itemArray);
    };
    Multichain.prototype._elementValueCompute = function (items) {
        var Utils = this.Utils;
        return items.map(function (element) {
            element.value = Utils.HexToAscii(element.data);
            return element;
        });
    };
    return Multichain;
}());
exports.Multichain = Multichain;
var MultichainConnection = /** @class */ (function () {
    function MultichainConnection(port, host, user, pass) {
        this.port = port;
        this.host = host;
        this.user = user;
        this.pass = pass;
    }
    return MultichainConnection;
}());
exports.MultichainConnection = MultichainConnection;
//# sourceMappingURL=Multichain.js.map