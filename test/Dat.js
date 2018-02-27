"use strict"
var DatManager = require('../build/transport/Dat').DatManager
var UserLib = require('../build/base/User')
var UserType = UserLib.UserType
var path = require('path')
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var fs = require("fs-extra")

describe('DatManager', ()=> {

    const sharedirKey = 'c5841a7f635fa01e7f93c7560bf0429ad75a06ac2e05ae930104779200b4ef69'

    var datman;
    var sharedir
    var newsharedir
    var download1dir

    before(() => {
        sharedir = path.join(__dirname, "/datresources/oldshare")
        newsharedir = path.join(__dirname, "/datresources/newshare")
        download1dir = path.join(__dirname, "/datresources/download1")
    })

    beforeEach(() => {
        clearTestDirectories();
        datman = new DatManager();
        fs.mkdirSync(download1dir);
    })

    afterEach(() => {
        datman.shutdown();
        clearTestDirectories();
    })

    var clearTestDirectories = () => {
        if (fs.existsSync(metadatadir(newsharedir))) {
            fs.remove(metadatadir(newsharedir), function(err) {
                if (err) console.log("Error cleaning up metadatadir: " + err.message);
            });
        }
        if (fs.existsSync(download1dir)) {
            try {
                fs.removeSync(download1dir);
            } catch (err){
                console.log("Error cleaning up metadatadir: " + err.message);
            }
        }
    }

    describe('managed DatNode', (done) => {

        var newsharekey;
        it.skip ('downloads files from an outgoing archive into a download directory', (done) => {
            datman.createOutgoingArchive(newsharedir, function(dm, outgoing) {
                newsharekey = outgoing._key;
                outgoing.importFiles(function(err) {
                    var outnet = outgoing._dat.joinNetwork(function(err) {
                        datman.createIncomingArchive(newsharekey, download1dir, function(dm, incoming){
                            var innet = incoming._dat.joinNetwork(function(err) {
                                done();
                            });
                        })
                    })
                })
            })
            //look into https://github.com/datproject/dat-node/blob/master/dat.js
            // see about replacing joinNode to create a local only hyperdrive network
        }).timeout(20000)

        it ('imports files from the share directory into an outgoing archive', (done) => {
            var outgoing;

            datman.on('create', function(dm, datnode1, err) {
                datnode1.on('import', function(datnode2, err) {
                    var stats = datnode2._stats.get();
                    done();
                });

                var stats = datnode1._stats.get();
                datnode1.importFiles();
            })
            datman.createOutgoingArchive(newsharedir);
        })

        it ('imports files added to the share directory into an outgoing archive', (done) => {
            datman.on('create', function(dm, datnode) {
                done();
            })
            datman.createOutgoingArchive(newsharedir);
        })

        it ('supports sharing the same outgoing archive under multiple keys', (done) => {

            done();
        })

    })

    describe('networking', () => {

        it ('is able to join the hyperdrive network', (done) => {

            done();
        })

    })

    it('creates an outgoing dat node for a new archive', (done) => {
        var dir = newsharedir;
        expect(fs.existsSync(metadatadir(dir))).to.be.false
        datman.on('create', function(dm, datnode, err) {
            expect(dm).to.equal(datman);
            expect(datnode).to.exist;
            expect(datnode.getKey()).to.exist;
            expect(fs.existsSync(metadatadir(dir))).to.be.true
            done();
        });
        datman.createOutgoingArchive(dir);
    })

    it('creates an outgoing dat node for an existing archive', (done) => {
        var dir = sharedir;
        expect(fs.existsSync(metadatadir(dir))).to.be.true
        datman.on('create', function(dm, datnode) {
            expect(dm).to.equal(datman);
            expect(datnode).to.exist;
            expect(datnode.getKey()).to.equal(sharedirKey);
            expect(fs.existsSync(metadatadir(dir))).to.be.true
            done();
        });
        datman.createOutgoingArchive(sharedir);
    })

    it('creates an incoming dat node for an archive', (done) => {
        var dir = download1dir;
        datman.on('create', function(dm, datnode) {
            expect(dm).to.equal(datman);
            expect(datnode.getKey()).to.exist;
            var key = datnode.getKey();
            expect(datman.getDatNode(key)).to.equal(datnode);
            done();
        });
        datman.createIncomingArchive(sharedirKey, dir);
    })


    it('creates an incoming dat node for an archive with no peers', (done) => {
        var dir = download1dir;
        datman.on('create', function(dm, datnode, error) {
            expect(dm).to.equal(datman);
            expect(datnode).to.not.exist;
            expect(error).to.exist;
            expect(error.message).to.equal("DNS record not found");
            done();
        });
        datman.createIncomingArchive("bunchofuckingnonsense", dir);
    })

    function metadatadir(dir) {
        return path.join(dir, "/.dat")
    }


// describe('Dat', () => {

//     var datsharedir
//     var datdownloaddir

//     before(() => {
//         datsharedir = path.join(__dirname, "/dat-share")
//         datdownloaddir = path.join(__dirname, "/dat-download")
//     })

//     describe('Create', () => {

//         var dat;




//     }

//     describe('Share', () => {

//         it('follows the expected lifecycle ') {
//             var events = []
//             var dat = new Dat()
//             dat.on('createnode', function(){
//                 events.push("Created node '" + dat.)
//             })
//             dat.on('joinnetwork', function(){console.log("WTF CHARLES2")})
//             dat.on('importFiles', function(){console.log("WTF CHARLES3")})
//             dat.Share(datsharedir, function (datnode, dat) {
//                 datnode.network.destroy()
//                 expect(fs.existsSync(dat.src)).to.be.true
//                 done()
//             })
//         }

//         it ('reuses existing node') {

//         }

//         it ('reuses existing network') {

//         }

//          it ('shares files in more than one batch') {

//         }
//     }

//     describe ('Download', () => {
//         it('allows for downloading a share', function (done) {
//             var dat1 = new Dat()
//             var dat2 = new Dat()
//             dat1.Share(datsharedir, function (key, logs) {
//                 dat2.Download(datdownloaddir, key, function (_logs) {
//                     //console.log("----------- ** KEY", key)
//                     dat1.network.destroy()
//                     dat2.network.destroy()
//                     expect(fs.existsSync(dat1.src)).to.be.true
//                     expect(fs.existsSync(dat2.destination)).to.be.true
//                     done()
//                 })
//             })
//         })

//         it.skip('returns an error when no shares exist for key', function (done) {
//             this.timeout(10000)
//             var dat1 = new Dat()
//             var envelope = dat1.Download(datdownloaddir, "a2f49b400f28b4090e186e7a9dad580cac8dcca3db1865be181ef8f61fa24df3", function (logs) {
//                 //console.log('----------- logs', logs)
//                 dat1.network.destroy()
//                 expect(logs).to.contain("No users currently online for that key.")
//                 done()
//             })
//             //console.log('--------- *** Dat Download Envelope', envelope)
//         })

//     })

//     describe('Multi tenant'), () => {

//         it('allows for multiple shares with unique keys', function (done) {
//             var dat1 = new Dat()
//             var dat2 = new Dat()
//             dat1.Share(datsharedir, function (key, logs) {
//                 dat2.Share(datsharedir, function (_key, _logs) {
//                     dat1.network.destroy()
//                     dat2.network.destroy()
//                     expect(fs.existsSync(dat1.src)).to.be.true
//                     expect(fs.existsSync(dat2.src)).to.be.true
//                     expect(key).to.not.equal(_key)
//                     done()
//                 })
//             })
//         })

//     })
})
