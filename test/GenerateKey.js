"use strict"
let chai = require('chai')
let expect = chai.expect
let GenerateKey = require('../build/secure/GenerateKey').GenerateKey

let bitcoin = require('bitcoinjs-lib')

describe('GenerateKey', () => {
    it('generates wif from rng', function(){
        var generator = new GenerateKey()
        function rng() { return Buffer.from('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz') }
        var keypair = generator.GenerateRandomKeyPair(rng)
        expect(keypair.toWIF()).to.eq(rngWif)
    })
    it('generates bip32 root privkey', function(){
        var key = seedMock
        var generator = new GenerateKey()
        var bip32 = generator.CalculateBip32FromSeed(key, "defcoin")
        expect(bip32.toBase58()).to.eq(seedKeyMock)
    })
    it('generates bip32 from phrase', function(){
        var generator = new GenerateKey()
        var bip32 = generator.CalculateBip32FromPhrase(phraseMock, "defcoin")
        expect(bip32.toBase58()).to.eq(phraseKeyMock)
    })
    it('generates correct bip44 address at index 0', function(done){
        var generator = new GenerateKey()
        var bip32 = generator.CalculateBip32FromPhrase(phraseMock, "defcoin")
        //console.log(generator.CalculateBip32FromSeed("adfdf3910aba40c404e8154d1580dcc131dd201d953723b2c28e4e901a5c611a"))
        generator.DeriveBip44(bip32, "defcoin", 1, function(addresses){
            console.log(addresses[0])
            expect(addresses[0]).to.eq(defcoinAddresses[0])
            done()
        })
    })
    it('returns a list of supported coins', function(){
        var generator = new GenerateKey()
        var coins = generator.GetAllAddresses("sock replace baby decline panther protect oblige cousin labor public brown bundle habit priority vehicle absorb pretty arrive west spring release sign left head", function(coins){
           //console.log("coins", coins)
        })
    })
})

var seedMock = 'ce16d8441c79fd5966098b7c55a0740f268355fc7806aa2193e5e99b53909fcb'
var phraseSeedMock = '2a839313fef027d4826624715f201834'
var seedKeyMock = "xprv9s21ZrQH143K3ErcmVvCGbWnVfZNUVBLsGDm426U7n2yQ6W6vrPhJBurFokkxuAeDY756r48mshiPt15DVTvu1UGFUbeU9ay6RuMNYBf1sh"
//var phraseMock = "rural also thought mother joy ridge leaf mule canoe manage edit robot innocent defy moral"
var phraseKeyMock = "xprv9s21ZrQH143K3UNAhezZRjb97XNbYoGCizhpc2LGaHXewDEE8ywFMFRw5nqsPnMqcnC5yymqbqdkJgXZQdNvZTTtBDJHKKNqgAii5aLzATG"
var rngWif = "L1Knwj9W3qK3qMKdTvmg3VfzUs3ij2LETTFhxza9LfD5dngnoLG1"
var rngAddress = "1F5VhMHukdnUES9kfXqzPzMeF1GPHKiF64"
var seedHexMock = "f7b57651f856592e75adac99f1eb658e9eb7b9690423833d0d7899900da6592a5a65aa2a4ecdff4d3f60fcec54300f167d9feeefad2b414823c53a3326c4c582"
var phraseMock = "clever broken shaft worth act tumble another setup image weekend alcohol harsh"
var splitPhraseMock =[ 'absurd ozone enjoy lazy traffic custom harbor tomato shoulder entire issue mistake render tail unfold',
'acquire curious still design either jealous puppy gown utility pelican course advice pretty calm switch',
'add problem palace awful ocean similar devote magic timber wife solve hero until vault they']
var defcoinAddresses = [
    "DBTRtwSAyHJzvzS7KUgxPyJF2PBbs8yUb3",
    "DFnNZittGhkPTbAye88NSiRfBbw1EibQXF",
    "DGdTQRRRProMXEgM1hyoPMnALtvUe5jWKk",
    "D7BaSgjTLVEDPGxyzR6iuzs3YLih4gGRdR",
    "DTBkzxoan8UxyFRQnz6xgjQzZsRNpJMXr3",
    "D8bYssLhPu2tR23C7SjHAjthZPEpmDkydg",
    "D9Jqrkh235bnFWiHSy14Fr3EaLofgNqZdv",
    "D7ip8QVEtpNNNvMXgyENqdnZjM5ngRUsZw",
    "DEhSFBhVPhFy4Pnso7NQ7i1GPrFjA4SFjc",
    "DJMBXp83pxcmhgXLy3LopHMAN6gq7day2T",
  ]