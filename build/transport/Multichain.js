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
    Multichain.prototype.Info = function (callback) {
        this.multichain.getInfo(function (err, info) {
            return callback(err, info);
        });
    };
    Multichain.prototype.Connect = function (connection) {
        this.multichain = MultichainLib(connection);
    };
    Multichain.prototype.Streams = function (callback) {
        this.multichain.listStreams(function (err, streams) {
            return callback(err, streams);
        });
    };
    Multichain.prototype.StreamItemsByKey = function (streamName, key, callback) {
        var Utils = this.Utils;
        this.multichain.listStreamKeyItems({
            stream: streamName,
            key: key,
            verbose: true
        }, function (error, items) {
            var itemArray = [];
            if (items && items.length > 0) {
                items.forEach(function (element, index) {
                    var item = element;
                    item.value = Utils.HexToAscii(element.data);
                    itemArray[index] = item;
                    if (index == items.length - 1) {
                        return callback(error, itemArray);
                    }
                });
            }
            else {
                return callback(error, itemArray);
            }
        });
    };
    /* TODO: refactor like StreamItemsByKey */
    Multichain.prototype.StreamItemsByPublisher = function (streamName, publisherAddress, cb) {
        var Utils = this.Utils;
        this.multichain.listStreamPublisherItems({
            stream: streamName,
            address: publisherAddress,
            verbose: true
        }, function (error, items) {
            var itemArray = [];
            if (error) {
                return cb(error, null);
            }
            items.forEach(function (element, index) {
                var item = Utils.HexToAscii(element.data);
                return cb(null, item);
            }, this);
        });
    };
    Multichain.prototype.GrantPermissionToAddress = function (addresses, permissions, callback) {
        this.multichain.grant({ addresses: addresses, permissions: permissions }, function (a, b) {
            return callback(a, b);
        });
    };
    Multichain.prototype.RevokePermissionToAddress = function (address, permissions, callback) {
        this.multichain.revoke({ addresses: address, permissions: permissions }, function (err, result) {
            return callback(err, result);
        });
    };
    Multichain.prototype.ImportAddress = function (address, name, callback) {
        this.multichain.importAddress({ address: address, label: name, rescan: false }, function (a, b) {
            return callback(a, b);
        });
    };
    Multichain.prototype.ImportPrivKey = function (key, callback) {
        this.multichain.importPrivKey([key], function (a, b) {
            return callback(a, b);
        });
    };
    Multichain.prototype.SendSignedTransaction = function (signed, callback) {
        this.multichain.sendRawTransaction([signed.toString("hex")], function (err, txid) {
            return callback(err, txid);
        });
    };
    Multichain.prototype.CreateAndSignSend = function (from, to, asset, qty, callback) {
        //var HDKey = new HDKeyLib.HDKey()
        var rawRequest = {};
        rawRequest[to] = {};
        rawRequest[to][asset] = Number(qty);
        var parent = this;
        parent.multichain.createRawSendFrom([from.address, rawRequest], function (err, raw) {
            //from.wif = HDKey.DeriveKeyWif(from, 0)
            /* parent.multichain.signRawTransaction([raw, [], [from.wif.wif]], function (err, signed) {
                return callback(err, signed)
            }) */
            parent.SignRaw(from, raw, function (err, signed) {
                return callback(err, signed);
            });
        });
    };
    Multichain.prototype.SignRaw = function (from, hex, callback) {
        var HDKey = new HDKeyLib.HDKey();
        from.wif = HDKey.DeriveKeyWif(from, 0);
        var parent = this;
        parent.multichain.signRawTransaction([hex, [], [from.wif.wif]], function (err, signed) {
            return callback(err, signed);
        });
    };
    Multichain.prototype.GetAssetBalance = function (address, asset, callback) {
        this.multichain.getAddressBalances({
            minconf: 0,
            address: address
        }, function (err, result) {
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
        }, function (a, b) {
            return callback(a, b);
        });
    };
    Multichain.prototype.Issue = function (to, name, qty, callback) {
        this.multichain.issue({ address: to, asset: { name: name, open: true }, qty: qty, units: 1 }, function (a, b) {
            return callback(a, b);
        });
    };
    Multichain.prototype.IssueMore = function (to, name, qty, callback) {
        this.multichain.issueMore({ address: to, asset: name, qty: qty }, function (a, b) {
            return callback(a, b);
        });
    };
    Multichain.prototype.CreateExchange = function (from, asset, asking, callback) {
        var parent = this;
        var assets = {};
        var ask = {};
        assets[asset] = 1;
        ask[asking] = 1;
        this.PrepareUnlockFrom(from, assets, function (err, unlocks) {
            var payload = { unlocks: unlocks, prepared: '', offer: assets, asking: ask };
            parent.multichain.createRawExchange({ txid: payload.unlocks.txid, vout: payload.unlocks.vout, assets: ask }, function (err, raw) {
                payload.prepared = raw;
                return callback(err, payload);
            });
        });
    };
    Multichain.prototype.FinalizeExchange = function (hex, txid, vout, assets, callback) {
        //console.log('--------- request', completeRequest)
        this.multichain.completeRawExchange({ hexstring: hex, txid: txid, vout: vout, assets: assets, data: '' }, function (err, complete) {
            console.log('-------- Error', err);
            console.log('-------- Complete', complete);
            return callback(err, complete);
        });
    };
    Multichain.prototype.PrepareUnlockFrom = function (from, assets, callback) {
        this.multichain.prepareLockUnspentFrom({ from: from, assets: assets, lock: true }, function (a, b) {
            return callback(a, b);
        });
    };
    Multichain.prototype.PrepareUnlock = function (assets, callback) {
        this.multichain.prepareLockUnspent({ assets: assets, lock: false }, function (a, b) {
            return callback(a, b);
        });
    };
    Multichain.prototype.IssueEmblem = function (to, assetName, callback) {
        this.Issue(to, assetName, 1, function (err, tx) {
            return callback(err, tx);
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