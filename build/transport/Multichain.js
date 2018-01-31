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
        if (connection)
            this.multichain = MultichainLib(connection);
    }
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
        this.multichain.importAddress({ address: address, label: name }, function (a, b) {
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
        var HDKey = new HDKeyLib.HDKey();
        var rawRequest = {};
        rawRequest[to.address] = {};
        rawRequest[to.address][asset] = Number(qty);
        var parent = this;
        parent.multichain.createRawSendFrom([from.address, rawRequest], function (err, raw) {
            from.wif = HDKey.DeriveKeyWif(from, 0);
            parent.multichain.signRawTransaction([raw, [], [from.wif.wif]], function (err, signed) {
                return callback(err, signed);
            });
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