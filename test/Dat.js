"use strict"
var Dat = require('../build/transport/Dat').Dat
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var fs = require("fs")


describe('Dat', () => {
    describe('Share', () => {
        it('should resolve provided path correcty', function(done) {
            var dat = new Dat()
            dat.Share("../../test/dat-share", function(key, logs){
                dat.network.destroy()
                expect(fs.existsSync(dat.src)).to.be.true
                done()
            })
        })

        it('should allow for multiple shares with unique keys', function(done) {
            var dat1 = new Dat()
            var dat2 = new Dat()
            dat1.Share("../../test/dat-share", function(key, logs){
                dat2.Share("../../test/dat-share", function(_key, _logs){
                    dat1.network.destroy()
                    dat2.network.destroy()
                    expect(fs.existsSync(dat1.src)).to.be.true
                    expect(fs.existsSync(dat2.src)).to.be.true
                    expect(key).to.not.equal(_key)
                    done()
                })
            })
        })

        it('should allow for downloading a share', function(done) {
            var dat1 = new Dat()
            var dat2 = new Dat()
            dat1.Share("../../test/dat-share", function(key, logs){
                dat2.Download("../../test/dat-download", key, function(_logs){
                    //console.log("----------- ** KEY", key)
                    dat1.network.destroy()
                    dat2.network.destroy()
                    expect(fs.existsSync(dat1.src)).to.be.true
                    expect(fs.existsSync(dat2.destination)).to.be.true
                    done()
                })
            })
        })

        it('should error when no shares exist for key', function(done) {
            this.timeout(10000)
            var dat1 = new Dat()            
                var envelope = dat1.Download("../../test/dat-download", "a2f49b400f28b4090e186e7a9dad580cac8dcca3db1865be181ef8f61fa24df3", function(logs){
                    console.log('----------- logs', logs)
                    dat1.network.destroy()
                    expect(logs).to.contain("No users currently online for that key.")                    
                    done()
                })
                //console.log('--------- *** Dat Download Envelope', envelope)
            })
        })    
})