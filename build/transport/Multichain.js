"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultichainLib = require("multichain-node");
var UtilLib = require("../Utils");
var HDKeyLib = require("../secure/HDKey");
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
            this.multichain = this.makeConnectedMultichainObject();
        }
    }
    Multichain.prototype.makeConnectionFromEnv = function () {
        return new MultichainConnection(Number(process.env.MULTICHAINport), process.env.MULTICHAINhost, process.env.MULTICHAINuser, process.env.MULTICHAINpass);
    };
    Multichain.prototype.makeConnectedMultichainObject = function () {
        return new Multichain(process.env.MULTICHAINADDRESS, this.makeConnectionFromEnv());
    };
    Multichain.prototype.hasConnection = function () {
        try {
            this.multichain.getInfo(function (error, info) { });
        }
        catch (TypeError) {
            if (TypeError.message == 'this.multichain.getInfo is not a function')
                return false;
            throw TypeError;
        }
        return true;
    };
    Multichain.prototype.Info = function (callback) {
        this.multichain.getInfo(function (error, info) {
            return callback(error, info);
        });
    };
    Multichain.prototype.Connect = function (connection) {
        this.multichain = MultichainLib(connection);
    };
    Multichain.prototype.Streams = function (callback) {
        this.multichain.listStreams(function (error, streams) {
            return callback(error, streams);
        });
    };
    Multichain.prototype.StreamItemsByKey = function (streamName, key, callback) {
        var _this = this;
        this.multichain.listStreamKeyItems({
            stream: streamName,
            key: key,
            verbose: true
        }, function (error, items) { return _this._StreamItems(error, items, callback); });
    };
    Multichain.prototype.StreamItemsByPublisher = function (streamName, publisherAddress, callback) {
        var _this = this;
        this.multichain.listStreamPublisherItems({
            stream: streamName,
            address: publisherAddress,
            verbose: true
        }, function (error, items) { return _this._StreamItems(error, items, callback); });
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
    Multichain.prototype.GrantPermissionToAddress = function (addresses, permissions, callback) {
        this.multichain.grant({
            addresses: addresses,
            permissions: permissions
        }, function (error, result) {
            return callback(error, result);
        });
    };
    Multichain.prototype.RevokePermissionToAddress = function (address, permissions, callback) {
        this.multichain.revoke({
            addresses: address,
            permissions: permissions
        }, function (error, result) {
            return callback(error, result);
        });
    };
    Multichain.prototype.ImportAddress = function (address, name, callback) {
        this.multichain.importAddress({
            address: address,
            label: name,
            rescan: false
        }, function (error, result) {
            return callback(error, result);
        });
    };
    Multichain.prototype.ImportPrivKey = function (key, callback) {
        this.multichain.importPrivKey([key], function (error, result) {
            return callback(error, result);
        });
    };
    Multichain.prototype.SendSignedTransaction = function (signed, callback) {
        this.multichain.sendRawTransaction([signed.toString("hex")], function (error, transaction_id) {
            return callback(error, transaction_id);
        });
    };
    Multichain.prototype.CreateAndSignSend = function (from, to, asset, qty, callback) {
        var rawRequest = {};
        rawRequest[to] = {};
        // TODO: Use promise with async and await instead of callback, to avoid race condition
        rawRequest[to][asset] = function () { return Number(qty); };
        var parent = this;
        parent.multichain.createRawSendFrom([from.address, rawRequest], function (error, raw) {
            parent.SignRaw(from, raw, function (error, signed) {
                return callback(error, signed);
            });
        });
    };
    Multichain.prototype.SignRaw = function (from, hex, callback) {
        var HDKey = new HDKeyLib.HDKey();
        from.wif = HDKey.DeriveKeyWif(from, 0);
        var parent = this;
        parent.multichain.signRawTransaction([hex, [], [from.wif.wif]], function (error, signed) {
            return callback(error, signed);
        });
    };
    Multichain.prototype.GetAssetBalance = function (address, asset, callback) {
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
    };
    Multichain.prototype.SendAssetFrom = function (from, to, amount, asset, callback) {
        this.multichain.sendAssetFrom({
            from: from,
            to: to,
            asset: asset,
            qty: amount
        }, function (error, transaction) {
            return callback(error, transaction);
        });
    };
    Multichain.prototype.Issue = function (to, name, qty, callback) {
        this.multichain.issue({
            address: to,
            asset: { name: name, open: true },
            qty: qty,
            units: 1
        }, function (error, transaction) {
            return callback(error, transaction);
        });
    };
    Multichain.prototype.IssueMore = function (to, name, qty, callback) {
        this.multichain.issueMore({
            address: to,
            asset: name,
            qty: qty
        }, function (error, transaction) {
            return callback(error, transaction);
        });
    };
    Multichain.prototype.CreateExchange = function (from, asset, asking, callback) {
        var parent = this;
        var assets = {};
        var ask = {};
        assets[asset] = 1;
        ask[asking] = 1;
        this.PrepareUnlockFrom(from, assets, function (error, unlocks) {
            var payload = { unlocks: unlocks, prepared: '', offer: assets, asking: ask };
            parent.multichain.createRawExchange({
                txid: payload.unlocks.txid,
                vout: payload.unlocks.vout,
                assets: ask
            }, function (error, raw) {
                payload.prepared = raw;
                return callback(error, payload);
            });
        });
    };
    Multichain.prototype.FinalizeExchange = function (hex, txid, vout, assets, callback) {
        //console.log('--------- request', completeRequest)
        this.multichain.completeRawExchange({
            hexstring: hex,
            txid: txid,
            vout: vout,
            assets: assets,
            data: ''
        }, function (error, complete) {
            console.log('-------- Error', error);
            console.log('-------- Complete', complete);
            return callback(error, complete);
        });
    };
    Multichain.prototype.PrepareUnlockFrom = function (from, assets, callback) {
        this.multichain.prepareLockUnspentFrom({
            from: from,
            assets: assets,
            lock: true
        }, function (error, transaction) {
            return callback(error, transaction);
        });
    };
    Multichain.prototype.PrepareUnlock = function (assets, callback) {
        this.multichain.prepareLockUnspent({
            assets: assets,
            lock: false
        }, function (error, transaction) {
            return callback(error, transaction);
        });
    };
    Multichain.prototype.IssueEmblem = function (to, assetName, callback) {
        this.Issue(to, assetName, 1, function (error, transaction) {
            return callback(error, transaction);
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