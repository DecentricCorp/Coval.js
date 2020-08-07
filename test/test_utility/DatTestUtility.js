"use strict"
var fs = require("fs-extra")
var path = require('path')
var DatLib = require('../../build/transport/Dat')
var DatManager = DatLib.DatManager
var DatNode = DatLib.DatNode

module.exports = {

    initialize_test_archive: function(path) {
        return fs.ensureDir(path)
        .then(() => {
            var datNode = new DatNode("", path, {})
            return datNode.initializeArchive()
        })
        .then((datnode) => {
            return datnode.importFiles()
        })
        .then((datnode) => {
            return datnode.close()
        })
    }

}
