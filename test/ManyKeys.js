"use strict"
let chai = require('chai')
let expect = chai.expect
let ManyKeys = require('../build/secure/ManyKeys')
var secrets = require('secrets.js-grempe')


describe('Manychain', () => {
    it('generates every possible key from provided seed', function(){
        var key = entropyMock
        var manykeys = new ManyKeys.ManyKeys(key)
        var all = manykeys.GetAllAddresses()
        expect(all).to.deep.equal(addressMock)
    })   
})

var entropyMock = 'ce16d8441c79fd5966098b7c55a0740f268355fc7806aa2193e5e99b53909fcb'
var addressMock = {
  blk: 'BANDP4HQRnzYf6WCG2UyGvJ5UFFwqQvim6',
  btc: '16v8mLqCgHQeDG22eYA19nVQjdpN7D6zLT',
  btg: 'GPm4BUA9f91wHjKKaUp7aYqJeocDADqzNU',
  dash: 'XgbybbV6dzdENCccWRUE1KBCZyQ47S7Cpt',
  dcr: 'STD8oBcMQebqjZoVBy95hgdyPR3nvG8Wvu',
  dgb: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr',
  doge: 'DB4EJbmqyhJvkGCdP89ZhYf1cmYfNeYtsr',
  ltc: 'LR962Z92kwehU4iBpg9JRoZAwrBeAwQJPk',
  mona: 'MDpHzmjcBJaT6vzMsWowQ46kCrhXc3tBii',
  nbt: 'BANDP4HQRnzYf6WCG2UyGvJ5UFFwqQvim6',
  nmc: 'N2VVxzLBbfWCjoGXvMUaNJeKTsDR72MoB5',
  ppc: 'UTu9ij6nxYvDpjVvK4og8JzuXwLWQg91Po',
  qtum: 'QSX7se7urkHTeQ744sUVH4H3Etm5J6drfp',
  rdd: 'ReXvpy1mzHg66hXK98USjS6Q8QXuV4CaTs',
  vtc: 'Vfuxg3zf66JrH2vBPKodagpGRT7LXc6PSf',
  zec: '2H977wKgDKUfrh1fy9jSeNraAYTDvrTc7BV'
};