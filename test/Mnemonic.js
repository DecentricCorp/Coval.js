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
    it('generates expected seed hex from known phrase', function(){
        var mnemonic = new Mnemonic()
        var seedHex = mnemonic.ToSeedHex(seedPhrase)
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
var seedPhrase = "disorder poet menu matrix enroll cushion horn sort limit egg churn echo area voyage enroll"
var seedHexMock = "2c42ea4ca162d781fb38a52cf8dc1c5e52ac9cccf621e1eccaced5adaa3c1ca0e0c5302ce7290a8541a97832622df5e8101b9a94fb83a3489128a72ca589c3f2"
var phraseMock = "clever broken shaft worth act tumble another setup image weekend alcohol harsh"
var splitPhraseMock =[ 'absurd ozone enjoy lazy traffic custom harbor tomato shoulder entire issue mistake render tail unfold',
'acquire curious still design either jealous puppy gown utility pelican course advice pretty calm switch',
'add problem palace awful ocean similar devote magic timber wife solve hero until vault they']