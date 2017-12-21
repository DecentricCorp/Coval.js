"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var Coval = require('../build/Coval').Coval
Coval = new Coval()
var CovalSecure = new Coval.Secure()
var Shamir = CovalSecure.Shamir
var Caesar = CovalSecure.Caesar
var HDKey = CovalSecure.HDKey
var Diffie = CovalSecure.Diffie
var Pre = CovalSecure.Pre
var Protected = CovalSecure.Protected
var standardHDKey, fromNs, toNs, to, from
var requestMock = {
    req: {
        body:{
            originalRequest: {
                data: {
                    team_id: "$teamId",
                    event: {
                        user: "$userId"
                    }
                },
                source: "$service"
            }
        }
    }
}

var fromExpected = {
    seed: 'b024ad77b56fdab85b53f38014c69a532b21a938bf501f6f31a79a8c936d4544',
    key: { "network": "livenet", "depth": 0, "fingerPrint": -1402895581, "parentFingerPrint": 0, "childIndex": 0, "chainCode": "caf57f46a56b458132742b7fdc87342a1ca0ade4e110601ac1f915bd843b7a6a", "privateKey": "98f6e3d1c09bd4656a24b7015962ec8671b8033a6138ed5b86d65ea2fd08d92e", "checksum": 1818171384, "xprivkey": "xprv9s21ZrQH143K45ZBzC6Rx6CLdiUNwLenjD9LeX5MVTH7YPD16RpdovAA3LtGJjgoygfqgV7TmL2eCeypHMqVaCQYbGwkrF2VivLmfx2rD8T" },
    address: '1NqeStawXbYLB5pKCd296fKgrpGxoiDKHd'
}
var toExpected = {
    seed: "4b2bed408c7803e966565af5e3dbeeb1736223b83fd11d64857ce58aec2bad9b",
    key: { "network": "livenet", "depth": 0, "fingerPrint": 2135691298, "parentFingerPrint": 0, "childIndex": 0, "chainCode": "c2a2c0eb36613af104a0983c5b7dbb00b602d6498c04e468b1d2f8079b801577", "privateKey": "890bb9e1ecd9c550c80ed2ed219bcf8628d418de1a4acdbc3ce1ab5f21d1e647", "checksum": 1231112784, "xprivkey": "xprv9s21ZrQH143K3zkRo56K6TbqHvgFxZzEDGZrWmnY1QDUKWgD2Ui81d9uG6qww3e6v187zJbhkaqYrYSvXytsvhUgvgpK5S4DT8uWBWYukvK" },
    address: '19CajoMnBL53YooWXMTr3qdaaZS1yj6eaW'
}

describe('Protected', function () {

  it('should not be able to access internal value', function () {
    var _protected = new Protected()
    expect(_protected.myPrivateVar).to.not.exist
  })

  it('should return expected value', function () {
    var _protected = new Protected(3)
    expect(_protected.Value().GetValue()).to.equal(3)
  })

  it('should not allow value to be accessed twice', function () {
    var _protected = new Protected("this msg will self destruct")
    expect(_protected.Value().GetValue()).to.equal("this msg will self destruct")
    expect(_protected.Value().GetValue()).to.equal(null)
  })

  it('should record error when read attempted twice', function () {
    var _protected = new Protected("this msg will self destruct")
    var readOnce = _protected.Value().GetValue()
    var readAgain = _protected.Value()
    expect(readOnce).to.equal("this msg will self destruct")
    expect(readAgain.HasErrors()).to.be.true
    expect(readAgain.Errors()[0].message).to.equal("Self destructed!")
  })

})

describe('Shamir', function () {

  describe('GetKey', function () {
    it('should not be null', function () {
      var key1 = new Shamir.Key().GetKey()
      should.exist(key1)
    })

    it('should return unique keys when called on unique objects', function () {
      let key1 = new Shamir.Key().GetKey()
      let key2 = new Shamir.Key().GetKey()
      key1.should.not.equal(key2)
    })

    it('should log error when accessing key twice', function () {
      var serverObject = new Shamir.Key()
      var key1 = serverObject.GetKey()
      expect(key1.Errors()).to.be.empty.and.an('Array')
      var key2 = serverObject.GetKey()
      expect(key2.Errors()).to.be.an('Array')
      expect(key2.Errors()[0].message).to.equal("Key accessed twice!")
    })

  })
  describe('CreateShares', function () {
    it('should split key into 2 shares', function () {
      var serverObject = new Shamir.Key()
      var shares = serverObject.CreateShares(2, 2).GetValue()
      expect(shares).to.not.be.empty
      expect(shares).to.be.an('Array')
    })
  })
  describe('CombineShares', function () {
    it('should combine shares', function () {
      var serverObject = new Shamir.Key()
      var shares = serverObject.CreateShares(2, 2).GetValue()
      var combined = serverObject.CombineShares(shares)
      expect(combined.value).to.be.a('string')
    })
  })
})

describe('Caesar', function () {
  describe('genKey', function () {
    it('should return private key', function () {
      var caesar = new Caesar()
      var pvt = caesar.CreatePrivate()
      expect(pvt).to.be.an('object')
    })
  })
  describe('key time signatures', () => {

    it('should sign msg successfully', () => {
      var caesar = new Caesar()
      var signer = caesar.CreateKtsSigner(2)
      var sig = signer.sign('Hello World')
      expect(sig).to.exist
    })

    /*
     * verify kts is broken
     */
    /* it('should verify signed msg', ()=>{
      var caesar = new Caesar()
      var signer = caesar.CreateKtsSigner(1)
      var signerPubkey = signer.getPublicKey()
      var verifier = caesar.CreateKtsVerifier(signerPubkey)
      var sig = signer.sign('Hello World')
      //verifier.verify('H', sig)
    }) */
  })
  describe('disk encryption', () => {
    it('encrypted stream should decrypt to desired text', (done) => {
      var caesar = new Caesar()
      var pvt = caesar.CreateRandom()
      var msgBuffer = new Buffer('Hello World!')

      var encrypter = new caesar.CreateXtsEncrypter(pvt)
      var decrypter = new caesar.CreateXtsDecrypter(pvt)

      encrypter.write(msgBuffer, function (encrypted) {
        decrypter.write(encrypted, msgBuffer.length, function (decrypted) {
          expect(decrypted).to.equal(msgBuffer.toString())
          done()
        })
      })
    })
  })
})

describe('HDKey', () => {
  describe('hdkey', function () {
    //this.timeout(100000)
    before(function (cb) {
      _before(cb)
    })

    it('Standard HD Key returns key and correctly derived address', function (cb) {
      var d =  standardHDKey.key.derive("m/0'/0/0")
      var derivedAddress = d.privateKey.toAddress().toString()
      expect(standardHDKey.address).to.equal(derivedAddress)
      return cb()
    })

    it('Specific namespace should return expected address/keys', function (cb) {
      var hdKey = new HDKey()
      fromNs = hdKey.MakeNamespace(createReqMock("mocha", "test", "from"))
      from = hdKey.MakeWalletFromNs(fromNs)
      expect(from.HasErrors()).to.be.false
      from = from.GetValue()
      var fromKey = hdKey.CreateKeysFromEncrypted(from.encrypted)
      from.wif = fromKey.wif      
      var hdWallet = JSON.parse(JSON.parse(JSON.stringify(fromKey.pk)))
      expect(from.address).to.equal(fromExpected.address)
      expect(hdWallet.chainCode).to.equal(fromExpected.key.chainCode)
      expect(hdWallet.privateKey).to.equal(fromExpected.key.privateKey)
      return cb()
    })



  })
})

describe('Diffie', () => {
  it('should be able to recreate key object from provided bits', () => {
    var strength = 128
    var dh = new Diffie(strength).Serialize()    
    var pubKey = dh.pubkey
    var dh2 = new Diffie(strength, dh.prime, dh.generator, dh.privkey)
    var pubKey2 = dh2.GetPubKey()
    expect(pubKey).to.deep.equal(pubKey2)

  })
  describe('Get Pubkey', () => {
    it('should generate a key', function() {
      var dh = new Diffie(128)
      var pubKey = dh.GetPubKey()
      expect(pubKey).to.exist
    })
    it('should produce different pubkeys for unique objects', () => {
      var dh1 = new Diffie(128)
      var dh2 = new Diffie(128)
      var key1 = dh1.GetPubKey()
      var key2 = dh2.GetPubKey()
      expect(key1).to.not.deep.equal(key2)
    })

    it('should produce same pubkey when called on same object', () => {
      var dh = new Diffie(128)
      var key1 = dh.GetPubKey()
      var key2 = dh.GetPubKey()
      expect(key1).to.deep.equal(key2)
    })
  })

  describe('Get Shared Secret', () => {
    it('should compute secret from personal private and externally supplied public keys', function (done) {
      //this.timeout(1000000)
      var strength = 128 /* 2048 */
      var alice = new Diffie(strength)
      var bob = new Diffie(strength, alice.GetPrime(), alice.GetGenerator())
      var aliceSecret = alice.GetSharedSecret(bob.GetPubKey()).toString('hex')
      var bobSecret = bob.GetSharedSecret(alice.GetPubKey()).toString('hex')
      expect(aliceSecret).to.equal(bobSecret)
      done()
    })
  })
  
})

describe('Pre', function(){
  it('should execute', function(done){
    var pre = new Pre()
    pre.Execute(function(msg){
      console.log('--------- Returned from Python script', JSON.stringify(msg, null, 4))
      expect(msg).to.contain('b\'Hello world\'')
      done()
    })
    

  })
})

function createReqMock(service, teamId, userId){
  var mock = JSON.stringify(requestMock.req)
  mock = mock.replace("$teamId", teamId)
  mock = mock.replace("$userId", userId)
  mock = mock.replace("$service", service)
  return JSON.parse(mock)
}

function _before(cb){
  var hdKey = new HDKey()
  hdKey.StandardHDKey(0, function(address, key){
      var standardDerived = hdKey.DeriveKeyWif({key: key})
      standardHDKey = {address: address, key: key, wif: standardDerived.wif, derived: standardDerived.derived}
      fromNs = hdKey.MakeNamespace(createReqMock("mocha","test","from"))
      from = hdKey.MakeWalletFromNs(fromNs)
      expect(from.HasErrors()).to.be.false
      from = from.GetValue()
      var fromKey = hdKey.CreateKeysFromEncrypted(from.encrypted)
      from.wif = fromKey.wif
      toNs = hdKey.MakeNamespace(createReqMock("mocha","test","to"))
      to = hdKey.MakeWalletFromNs(toNs)
      //var toKey = hdKey.createKeysFromEncrypted(to.encrypted)
      return cb() 
      /* return importAddressesWithGrant(function(){
          return cb()
      }) */       
  })
}
