"use strict"
var chai = require('chai')
var expect = chai.expect
var should = chai.should()
var UnloqLib = require("../build/partner/Unloq").Unloq
var path = require("path")
var td = require('testdouble')
var MOCK = true
require("dotenv").config({
    path: path.join(__dirname, "..", "build", "test.env")
})

describe('Unloq', () => {
    it('instantiates with provided api key', function (done) {
        this.timeout(100000)
        var Unloq = new UnloqLib(process.env.UNLOQ_KEY)
        expect(Unloq.config.unloq.key).to.equal(process.env.UNLOQ_KEY)
        done()
    })

    it('instantiates without an api key', function (done) {
        this.timeout(100000)
        var Unloq = new UnloqLib()
        expect(Unloq.config.unloq.key).to.not.exist
        done()
    })

    describe('Authenticate', () => {
        it('fails gracefully on incorrect email')
        it('fails gracefully on no api key')
        it('successfully authenticates with unloq', function (done) {
            this.timeout(10000)
            var Unloq = new UnloqLib(process.env.UNLOQ_KEY)
            if (MOCK) {
                td.replace(Unloq.Api, 'authenticate')
                td.when(Unloq.Api.authenticate(td.matchers.anything())).thenResolve(mocks.accessToken)
                td.replace(Unloq.Api, 'tokenData')
                td.when(Unloq.Api.tokenData(td.matchers.anything(), td.matchers.anything())).thenResolve(mocks.userData)
            }
            Unloq.Authenticate(mocks.userData.email, function (userObject, token) {
                //console.log('-------- authenticate', userObject, {token: token})
                expect(userObject.unloq_id).to.equal(mocks.userData.unloq_id)
                done()
            })
        })
    })
    describe('Authorize', () => {
       
        it('allows for successful authorization', function(done) {
            this.timeout(10000)
            var Unloq = new UnloqLib(process.env.UNLOQ_KEY)
            if (MOCK) {
                td.replace(Unloq, 'Authorize', function (id, cb) {
                    return cb(mocks.authorize)
                })
            }
            Unloq.Authorize(mocks.userData.unloq_id, function (result) {
                expect(result.approval_id).to.not.be.null
                done()
            })
        })
    })

    describe('Encryption', () => {
        it('can get key', function(done) {
            this.timeout(100000)
            var Unloq = new UnloqLib(process.env.UNLOQ_KEY)
            if (MOCK) {
                td.replace(Unloq, 'GetEncryptionKey', function (id, cb) {
                    return cb(mocks.key_request)
                })
            }
            Unloq.GetEncryptionKey(mocks.userData.unloq_id, function(key){
                expect(key.result.encryption_key).to.equal(mocks.key_request.result.encryption_key)
                //console.log('---------- key', key)
                done()
            })
        })
    })
})

let mocks = {
  accessToken: {
    unloq_id: '4135',
    token:
      'AUKcz8t9SEtK7lRzy51XIpFt10Si5oHtYVqDXXVqtV8Skdt5c6Kf0HH5HEUBXtXHsaAZd9RLyJCOfzVIVYoSp5YhoftQXMady3vlnooYyQD0sDt5A9EOKVF5v8VkfvXpaR0c'
  },
  userData: {
    approval_id: '54cbb322-15cd-4ff1-b913-f67819ca9aff-HP7B6tkO',
    unloq_id: '4135',
    account_id: '1423',
    email: 'shannon+103@synrg.tech',
    method: 'UNLOQ',
    first_name: 'shannon',
    last_name: 'code',
    token_type: 'AUTHENTICATE'
  },
  authorize: {
    type: 'api.application.approval.authorize',
    result: {
      approval_id: 'd8c6dddd-e543-4427-b85e-05cba8d084f2-DjsPAslV',
      unloq_id: '4135',
      ip_device: '104.182.53.122'
    }
  },
  key_request: {
    type: 'api.application.approval.encryption',
    result: {
      approval_id: '1f27f384-0029-4a66-83ad-9ba81791e897-2AfpTREm',
      unloq_id: '4135',
      encryption_key: 'mQtbY9jxgm3nsF7nYxT5Xg5VXpQrjNoA',
      ip_device: '104.182.53.122'
    }
  }
};
