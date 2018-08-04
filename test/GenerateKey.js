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
        var key = entropyMock
        var generator = new GenerateKey()
        var bip32 = generator.CalculateBip32(key, "defcoin")
        expect(bip32.pk.toBase58()).to.eq(entropyKeyMock)
    })
    it('generates bip32 from phrase', function(){
        var generator = new GenerateKey()
        var bip32 = generator.CalculateBip32FromPhrase(phraseMock, "defcoin")
        expect(bip32.rootKey).to.eq(phraseKeyMock)
    })
})

var entropyMock = 'ce16d8441c79fd5966098b7c55a0740f268355fc7806aa2193e5e99b53909fcb'
var entropyKeyMock = "xprv9s21ZrQH143K3ErcmVvCGbWnVfZNUVBLsGDm426U7n2yQ6W6vrPhJBurFokkxuAeDY756r48mshiPt15DVTvu1UGFUbeU9ay6RuMNYBf1sh"
var phraseMock = "rural also thought mother joy ridge leaf mule canoe manage edit robot innocent defy moral"
var phraseKeyMock = "xprv9s21ZrQH143K3UNAhezZRjb97XNbYoGCizhpc2LGaHXewDEE8ywFMFRw5nqsPnMqcnC5yymqbqdkJgXZQdNvZTTtBDJHKKNqgAii5aLzATG"
var rngWif = "L1Knwj9W3qK3qMKdTvmg3VfzUs3ij2LETTFhxza9LfD5dngnoLG1"
var rngAddress = "1F5VhMHukdnUES9kfXqzPzMeF1GPHKiF64"
var seedHexMock = "f7b57651f856592e75adac99f1eb658e9eb7b9690423833d0d7899900da6592a5a65aa2a4ecdff4d3f60fcec54300f167d9feeefad2b414823c53a3326c4c582"
var phraseMock = "clever broken shaft worth act tumble another setup image weekend alcohol harsh"
var splitPhraseMock =[ 'absurd ozone enjoy lazy traffic custom harbor tomato shoulder entire issue mistake render tail unfold',
'acquire curious still design either jealous puppy gown utility pelican course advice pretty calm switch',
'add problem palace awful ocean similar devote magic timber wife solve hero until vault they']