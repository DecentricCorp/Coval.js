"use strict"
var DatLib = require('../build/transport/Dat')
var DatManager = DatLib.DatManager
var DatNode = DatLib.DatNode
var UserLib = require('../build/base/User')
var UserType = UserLib.UserType
var path = require('path')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var expect = chai.expect
var should = chai.should()
var fs = require("fs-extra")
chai.use(chaiAsPromised);



describe('Dat Protocol', ()=> {

    const existingOwnedArchiveKey = 'c5841a7f635fa01e7f93c7560bf0429ad75a06ac2e05ae930104779200b4ef69'
    const datMetadataDirectory = '/.dat'
    var existingOwnedArchiveDirectory
    var newOwnedArchiveDirectory
    var peerArchiveDirectory

    function deleteFolder(path) {
        try {
            if (fs.existsSync(path)) {
                fs.removeSync(path)
            }
        } catch (error) {
            console.debug("error while deleting folder: " + error)
        }
    }

    before(() => {
        existingOwnedArchiveDirectory = path.join(__dirname, "/datresources/oldshare")
        newOwnedArchiveDirectory = path.join(__dirname, "/datresources/newshare")
        peerArchiveDirectory = path.join(__dirname, "/datresources/download1")
    })

    beforeEach(() => {
        deleteFolder(path.join(newOwnedArchiveDirectory, datMetadataDirectory))
        deleteFolder(peerArchiveDirectory)
        fs.mkdirSync(peerArchiveDirectory)
    })

    describe('DatNode', ()=> {
        var createdNodes = []

        afterEach(() => {
            try {
                var promises = []
                createdNodes.forEach(function (datnode) {
                    if (datnode) {
                        promises.push(datnode.close())
                    }
                }
            )} catch (error) {
                console.error("Error while cleaning up datnodes:")
                console.error(error)
            }
            createdNodes = []
            return Promise.all(promises).catch(function(err) {
                console.error("Error while cleaning up datnodes:")
                console.error(err)
            })
        })

        describe('archive initialization', function () {

            it('is able to initialize a new archive', function() {
                var node = new DatNode("T-NewArchive", newOwnedArchiveDirectory, {watch:true, temp:true})
                createdNodes.push(node)
                return node.initializeArchive()
                .then(datnode => {
                    expect(datnode.getID()).to.equal("T-NewArchive")
                    expect(datnode.getArchiveKey()).to.exist
                })
            })

            it('is able to initialize an existing archive', function() {
                var node = new DatNode("T-OldArchive", existingOwnedArchiveDirectory, {watch:true})
                createdNodes.push(node)
                return node.initializeArchive()
                .then(datnode => {
                    expect(datnode.getID()).to.equal("T-OldArchive")
                    expect(datnode.getArchiveKey()).to.equal(existingOwnedArchiveKey)
                })
            })

            it('is able to initialize an archive owned by a peer', function() {
                var node = new DatNode("T-PeerArchive", peerArchiveDirectory, { key: existingOwnedArchiveKey, temp: true })
                createdNodes.push(node)
                return node.initializeArchive()
                .then(datnode => {
                    expect(datnode.getID()).to.equal("T-PeerArchive")
                    expect(datnode.getArchiveKey()).to.equal(existingOwnedArchiveKey)
                })
            })
        })

        describe('when creating shared archives', function() {

            it('is able to announce a new owned archive', function() {
                var node = new DatNode("T-NewArchive", newOwnedArchiveDirectory, {watch:true, temp:true})
                createdNodes.push(node)
                return node.initializeArchive()
                .then(function(datnode) {return datnode.joinNetwork()})
                .then((datnode) => {
                    expect(datnode.getID()).to.equal("T-NewArchive")
                    expect(datnode.getArchiveKey()).to.exist
                    expect(datnode.peerSearching()).to.be.false
                    expect(datnode.peerNotFound()).to.be.true
                })
            }).timeout(25000)
        })

        describe('when replicating existing archives', function() {

            var sharedArchiveNode

            before(function() {
                this.timeout(15000)
                sharedArchiveNode = new DatNode("T-OldArchive", existingOwnedArchiveDirectory, {watch:true})
                return sharedArchiveNode.initializeArchive()
                .then(function(dn) {return dn.joinNetwork()})
                .then(function(dn) {return dn.importFiles()})
                .catch(function(error) {
                    console.error("Unexpected error while created peer share:")
                    console.error(error)
                })
            })

            after(() => {
                return sharedArchiveNode.close()
            })

            it('is able to connect to a peer archive', function() {
                var myNode = new DatNode("T-PeerArchive", peerArchiveDirectory, {key:existingOwnedArchiveKey, temp:true})
                createdNodes.push(myNode)
                return myNode.initializeArchive()
                .then(function(datnode) {return datnode.joinNetwork()})
                .then(function(datnode) {
                    //peerArchiveDirectory should have a copy of the files in existingOwnedArchiveDirectory
                    expect(datnode.peerFound()).to.be.true
                })
            }).timeout(25000)

        })
    })

    describe('DatManager', ()=> {

        var datman

        before(()=>{
            datman = new DatManager()
        })

        afterEach(() => {
            return datman.shutdown()
            .catch(function (err) {
                console.error("Error while shutting down datmanager:")
                console.error(err)
            })
        })

        describe('when shutting down', () => {

            it('it disposes all Dat nodes', () => {
                 return Promise.all([
                    datman.createDatNode("dn1", null, null),
                    datman.createDatNode("dn2", null, null),
                    datman.createDatNode("dn3", null, null)])
                .then(function(datnodes) {
                    expect(Object.keys(datman._datnodes)).to.have.length(3)
                    return datman.shutdown()
                })
                .then(function() {
                    expect(Object.keys(datman._datnodes)).to.have.length(0)
                })
            })

            it('it does not rethrow exceptions', () => {
                return Promise.all([
                    datman.createDatNode("dn1", null, null),
                    datman.createDatNode("dn2", null, null),
                    datman.createDatNode("dn3", null, null)])
                .then(function(datnodes) {
                    new Promise(function(resolve, reject) {
                        var datnode = datman.getDatNode('dn1')
                        datnode.close = function(){throw new Error("bogus")}
                    })
                })
                .then(function() {
                    expect(Object.keys(datman._datnodes)).to.have.length(3)
                    return datman.shutdown()
                }).then(function() {
                    expect(Object.keys(datman._datnodes)).to.have.length(0)
                })
            })

        })

        describe('when creating a Dat node', () => {

            it('it stores the node using given ID', () => {
                return datman.createDatNode("createDN1", null, {})
                .then((datnode) => {
                    var datmanager = datman
                    expect(datnode).to.equal(datmanager.getDatNode(datnode.getID()))
                })
            })

            it('it raises an error if an ID is re-used', () => {
                return datman.createDatNode("createDN1", null, {})
                .then(function(datnode) {return datman.createDatNode("createDN1", null, {})})
                .should.be.rejectedWith("DatNode with ID createDN1 already exists")
            })

        })

        describe('when disposing a Dat node', () => {

            it('it closes the dat node and removes node from manager', () => {
                return datman.createDatNode("disposeDN1", null, {})
                .then((datnode) => {return datman.disposeDatNode("disposeDN1")})
                .then((datnode) => {return new Promise(function(resolve, reject) {
                    expect(datman.getDatNode("disposeDN1")).to.not.exist
                    resolve()
                })})
            })

            it('it removes the node even if there is an unhandled error', () => {
                return datman.createDatNode("disposeDN1", null, {})
                .then((datnode) => {
                    return new Promise(function(resolve, reject){
                        datman.getDatNode("disposeDN1").close = function() {
                            throw new Error("Bogus")
                        }
                        resolve(datnode)
                })})
                .then((datnode) => {
                    return datman.disposeDatNode("disposeDN1")})
                .catch(function(datnode){
                    expect(datman.getDatNode("disposeDN1")).to.not.exist
                })
            })

        })

    })
})
//     describe.skip('hyperdrive integration tests', (done) => {
//         it ('is able to join the hyperdrive network', (done) => {
//             //look into https://github.com/datproject/dat-node/blob/master/dat.js
//             // see about replacing joinNode to create a local only hyperdrive network
//             done()
//         })
//     })

//     describe.skip('managed share DatNode', (done) => {
//         var newsharekey
//         var newShareDatNode
//         var oldShareDatNode

//         beforeEach(function() {
//             return new Promise(function (resolve) {
//                  datman.createOutgoingArchive(newsharedir, )
//             })
//         })

//         it.skip ('downloads files from an outgoing archive into a download directory', (done) => {
//             datman.createOutgoingArchive(newsharedir, function(dm, outgoing) {
//                 newsharekey = outgoing._key
//                 outgoing.importFiles(function(err) {
//                     outgoing.joinNetwork(function(outnode, err) {
//                         datman.createIncomingArchive(newsharekey, download1dir, function(dm, incoming){
//                             incoming.joinNetwork(function(innode, err) {
//                                 //check that the contents of newsharedir have been copied into download1dir
//                                 expect(datnode.peerFound()).to.be.true
//                                 done()
//                             })
//                         })
//                     })
//                 })
//             })
//             //look into https://github.com/datproject/dat-node/blob/master/dat.js
//             // see about replacing joinNode to create a local only hyperdrive network
//         }).timeout(20000)

//         it ('imports files from the share directory into an outgoing archive', (done) => {
//             var outgoing

//             datman.on('create', function(dm, datnode1, err) {
//                 datnode1.on('import', function(datnode2, err) {
//                     var stats = datnode2._stats.get()
//                     done()
//                 });

//                 var stats = datnode1._stats.get()
//                 datnode1.importFiles()
//             })
//             datman.createOutgoingArchive(newsharedir)
//         })

//         it ('imports files added to the share directory into an outgoing archive', (done) => {
//             datman.createOutgoingArchive(newsharedir, function(datman, datnode1, err1) {

//                 done()
//             });
//         })

//         it ('supports sharing the same outgoing archive under multiple keys', (done) => {
//             datman.createOutgoingArchive(newsharedir, function(datman, datnode1, err1) {
//                 // this may be a nonbo; sharing the same archive twice appears to be an error state (if both archives are not transient, Dat complains about invalid state)
//                 expect(err1).to.not.exist
//                 datman.createDatNode(newsharedir, {temp:true}, function(datman, datnode2, err2) {
//                     expect(datnode1).to.exist
//                     expect(datnode2).to.exist
//                     expect(datnode1.getKey()).to.not.be.equal(datnode2.getKey())
//                     done()
//                 })
//             })
//         })

//     })



