"use strict"
import * as Un from "unloq"
import * as crypto from "crypto"
import * as uuid from "node-uuid"

export interface IIdentity {
    type: string
}

export class Unloq implements IIdentity {
    public type: string;
    Api: any;
    client: any
    constructor(public key?) {
        this.client = Un
        this.Api = new this.client.Api(this.config.unloq)
        this.type = "Unloq"
    }
    public config = {
        port: 3200,
        sessionLife: 3600,
        unloq: {
            key: this.key || null
        }
    }
    public Authenticate(email: string, callback) {
        let API = this.Api
        let CONFIG = this.config
        let token = null
        let genid = this.genid
        API.authenticate({
            email: email
        }).then(function (accessToken) {
            token = accessToken.token
            var sessionId = genid()
            API.tokenData(token, {
                session_id: sessionId,
                duration: CONFIG.sessionLife
            }).then(function (userData) {
                userData.sessionId = sessionId
                return callback(userData, token)
            })
        })
    }

    public Authorize(unloqId, callback){
        // The following code will initiate an authorisation request, using the following action
        // representation:
        //    code: 'transfer'
        //    title: 'Transfer resource $name?'
        //    message: 'Are you sure you want to transfer $name to the user $target?'
        var request = require('request')
        request.post({
            url: 'https://api.unloq.io/v1/authorize/transfer',
            headers: {
            'Authorization': 'Bearer ' + this.key
            },
            form: {
                unloq_id: unloqId,
                reference: 'abcdefg12',
                name: 'Cleverly named emblem',
                target: 'genecyber@gmail.com'
            }
        }, function(err, val){
            return callback(val.body)
        });
        // The resulting authorisation request will display the following messages:
        // - title: 'Transfer resource Server 1?'
        // - message: 'Are you sure you want to transfer Server 1 to the user john@doe.com?'
    }

    public GetEncryptionKey(unloqId, callback) {
        let API = this.Api
        let CONFIG = this.config
        var request = require('request')
        request.post({
            url: 'https://api.unloq.io/v1/encryption/user',
            headers: {
            'Authorization': 'Bearer ' + this.key,
            'Content-Type': 'application/json'
            },
            form: {
                unloq_id: unloqId
            }
        }, function(err, val){
            return callback(val.body)
        });
        /* API.generateToken({
            email: email, device_token: token
        }).then(function(token){
            return callback(token)
        }).catch(err => {
            return callback(err)
        }) */
        //https://api.unloq.io/v1/encryption/user


    }

    public ValidateToken(token, callback) {
        var request = require('request')
        let CONFIG = this.config
        request.post({
            url: 'https://api.unloq.io/v1/token',
            headers: {
            'Authorization': 'Bearer ' + this.key,
            'Content-Type': 'application/json'
            },
            form: {
                token: token,
                duration: CONFIG.sessionLife
            }
        }, function(err, val){
            return callback(val.body)
        });
    }

    genid() {
        return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex");
    }
}

