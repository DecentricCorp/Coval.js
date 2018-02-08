"use strict"
var UtilLibrary = require("../build/Utils").Utils

var chai = require('chai')
var expect = chai.expect
var Utils = new UtilLibrary()

describe('Utils', () => {
    describe('Hex', () => {
        describe('Encode', () => {
            it('correctly encodes simple string to hex', () => {
                var encoded = Utils.HexEncode("simple string")
                expect(encoded).to.equal('00730069006d0070006c006500200073007400720069006e0067')
            })

            it('correctly encodes empty space to hex', () => {
                var encoded = Utils.HexEncode(" ")
                expect(encoded).to.equal('0020')
            })
        })
        describe('Decode', () => {
            it('correctly decodes simple string', () => {
                var decoded = Utils.HexDecode("00730069006d0070006c006500200073007400720069006e0067")
                expect(decoded).to.equal('simple string')
            })
        })
    })
})
