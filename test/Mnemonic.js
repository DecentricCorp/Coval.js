"use strict"
let chai = require('chai')
let expect = chai.expect
let Mnemonic = require('../build/secure/Mnemonic').Mnemonic


describe('Mnemonic', () => {
    it('generates expected phrase from known entropy', function(){
        var key = entropyMock
        var mnemonic = new Mnemonic(key)
        var phrase = mnemonic.Generate()
        expect(phrase).to.eq(entropyPhrase)
    })
    it('generates expected entropy from known phrase', function(){
        var mnemonic = new Mnemonic()
        var entropy = mnemonic.ToEntropy(entropyPhrase)
        expect(entropy).to.eq(entropyMock)
    })
    it('generates expected entropy hex from known phrase', function(){
        var mnemonic = new Mnemonic()
        var seedHex = mnemonic.ToSeedHex(entropyPhrase)
        expect(seedHex).to.eq(seedHexMock)
    })
    it('generates unique phrase when using multiple mnemonic objects', function(){
        var mnemonic1 = new Mnemonic()
        var mnemonic2 = new Mnemonic()
        var phrase1 = mnemonic1.Generate()
        var phrase2 = mnemonic2.Generate()
        expect(phrase1).to.not.eq(phrase2)
    })
    it('generates unique phrase when using single mnemonic object', function(){
        var mnemonic = new Mnemonic()
        var phrase1 = mnemonic.Generate()
        var phrase2 = mnemonic.Generate()
        expect(phrase1).to.not.eq(phrase2)
    })
    it('generates split mnumonics', function(){
        var mnemonic = new Mnemonic()
        var shares = mnemonic.Split()
        expect(shares).to.not.be.empty
        expect(shares).to.have.lengthOf(3)
    })
    it('recovers split mnumonics', function(){
        var mnemonic = new Mnemonic(entropyMock)
        var shares = mnemonic.Combine(splitPhraseMock)
        expect(shares).to.eq(phraseMock)
    })
})

var entropyMock = 'ce16d8441c79fd5966098b7c55a0740f268355fc7806aa2193e5e99b53909fcb'
var entropyPhrase = "sock replace baby decline panther protect oblige cousin labor public brown bundle habit priority vehicle absorb pretty arrive west spring release sign left head"
var seedHexMock = "f7b57651f856592e75adac99f1eb658e9eb7b9690423833d0d7899900da6592a5a65aa2a4ecdff4d3f60fcec54300f167d9feeefad2b414823c53a3326c4c582"
var phraseMock = "clever broken shaft worth act tumble another setup image weekend alcohol harsh"
var splitPhraseMock =[ 'absurd ozone enjoy lazy traffic custom harbor tomato shoulder entire issue mistake render tail unfold',
'acquire curious still design either jealous puppy gown utility pelican course advice pretty calm switch',
'add problem palace awful ocean similar devote magic timber wife solve hero until vault they']