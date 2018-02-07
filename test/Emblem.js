"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var UserLib = require('../build/base/User')
var Emblem = require('../build/Emblem').Emblem
var Dat = require('../build/transport/Dat').Dat

describe('Emblem', function(){
    describe('Add Dat', function(){
        it('Successfully adds dat to emblem', function(){
            var emblem = new Emblem()
            var dat = new Dat(UserLib.Client)
            var msg = emblem.AddDat(dat)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(msg.GetValue()).to.equal('Sucessfully added dat')
        })
        it('Only allows a single dat of any type to be added', function(){
            var emblem = new Emblem()
            var dat1 = new Dat(UserLib.Client)
            var dat2 = new Dat(UserLib.Client)
            var msg1 = emblem.AddDat(dat1)
            var msg2 = emblem.AddDat(dat2)
            expect(emblem.dats).to.have.lengthOf(1)
            expect(msg1.GetValue()).to.equal('Sucessfully added dat')
            expect(msg2.Errors()[0].message).to.equal('Dat of this type already exists')
        })
    })   
    describe('HasRequiredDats', function(){
        it('Is false when required dats are not fulfilled', function(){
            var emblem = new Emblem()
            var dat = new Dat(UserLib.Client)
            expect(emblem.dats).to.have.lengthOf(0)
            expect(emblem.HasRequiredDats()).to.false            
            emblem.AddDat(dat)
            expect(emblem.HasRequiredDats()).to.false
        })
        it('Is true when required dats are fulfilled', function(){
            var emblem = new Emblem()
            var dat1 = new Dat(UserLib.Client)
            var dat2 = new Dat(UserLib.Server)
            var msg1 = emblem.AddDat(dat1)
            var msg2 = emblem.AddDat(dat2)
            expect(emblem.HasRequiredDats()).to.true
        })
    })
    describe('Claimed', ()=>{
        it('Returns false until claimed', ()=>{
            var emblem = new Emblem()
            expect(emblem.claimed).to.be.false
        })
    })
})