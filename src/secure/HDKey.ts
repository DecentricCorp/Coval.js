"use strict"
import * as bitcore from "bitcore"
import {coininfo, supportedCoins} from "coininfo"
import * as CryptoJS from "crypto-js"
import * as _Utils from "../Utils"
import {Envelope} from "../transport/Envelope"
import * as CoinKey from "coinkey"
let bitcoin = coininfo.bitcoin.main
let bitcoinBitcoreLib = bitcoin.toBitcore()


let APIKey = /* process.env.APIKey ||  */"3031323334353637383931323334353637383930"
var Utils = new _Utils.Utils()
export class HDKey {
    CreateNamespacedHDKey(ns: string, sha256Password?: string, plainTextPassword?: string, walletPath?: number){
        var envelope = new Envelope()
        var seed:  any, nonce, passHex, pass: any
        var path = EncodePath(walletPath)
        //console.log("--=-=-=-=-=-=-=-==-=", path, walletPath, ns, sha256Password, plainTextPassword)
        ns = Utils.HexEncode(ns)
        pass = EncodePass(sha256Password, plainTextPassword)
        //console.log("--=-=-=-=-=-=-=-==-= pass", pass)
        nonce = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(ns + APIKey)).toString('hex')
        //console.log("--=-=-=-=-=-=-=-==-= nonce", nonce)
        seed = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(ns + pass + nonce)).toString('hex')
        //console.log("--=-=-=-=-=-=-=-==-= seed", seed)
        return GeneratePayloadFromSeed(seed, path, function(address: any, pk: any){
            var encrypted = CryptoJS.AES.encrypt(seed, pass).toString()
            envelope.AddValue({encrypted: encrypted, address: address})
            return envelope
        }) 
    }
    DecodeKey(encrypted: string, sha256Password?: string, plainTextPassword?: string, walletPath?: number){
        let path = EncodePath(walletPath)
        
        let pass = EncodePass(sha256Password, plainTextPassword)
        let seed = CryptoJS.AES.decrypt(encrypted, pass).toString(CryptoJS.enc.Utf8)
        //return {seed: seed, pass: pass}
        try {
            return GeneratePayloadFromSeed(seed, path, function(address: any, pk: any){
                return {seed: seed, key: pk, address: address}
            })
        } catch(err){
            return {error:err}
        }
        /* Debug */ //return {encrypted:encrypted, sha256Password:sha256Password, plainTextPassword:plainTextPassword, walletPath:walletPath, path:path, pass:pass, seed:seed }
    }
    public StandardHDKey(walletPath: number, cb: any) {
        var pk = new bitcore.HDPrivateKey(bitcore.Networks.mainnet)
        var d = pk.derive("m/0'/0/"+walletPath, false)
        var address = d.privateKey.toAddress().toString()
        return cb(address, pk)
    }
    public MakeNamespace(req: any) {
        var teamId, userId, service, ns
            teamId = req.body.originalRequest.data.team_id
            userId = req.body.originalRequest.data.event.user
            service = req.body.originalRequest.source
            ns = service+":"+teamId+":"+userId
        return ns
    }
    public GetBitcore() {
        return bitcore
    }
    /* public MakeNamespaceOverride(userId: string, req: any) {
        var teamId, service, ns
            teamId = req.body.originalRequest.data.team_id
            service = req.body.originalRequest.source
            ns = service+":"+teamId+":"+userId
            console.log('--------- Namespace', ns)
        return ns
    } */
    public MakeWalletFromNs(ns: string){
        return this.CreateNamespacedHDKey(ns)
    }
    public CreateKeysFromEncrypted(encrypted: string) {
        var fromKey = this.DecodeKey(encrypted)
        return this.DeriveKeyWif(fromKey, 0)
    }
    public DeriveKeyWif(fromKey: any, index: number){
        if (!index) {index = 0}
        var hdPrivateKey = new bitcore.HDPrivateKey(fromKey.key, bitcore.Networks.mainnet)
        var derived = hdPrivateKey.derive("m/0'/0/0")
        var wif = derived.privateKey.toWIF()
        return {derived: derived, wif: wif, pk: fromKey.key }
    }

}

function EncodePath(walletPath?: number){
    var path = walletPath || 0
    return path
}

function EncodePass(sha256Password?: string, plainTextPassword?: string){
    var pass
    if (sha256Password){
        pass = sha256Password
    } else if(plainTextPassword) {
        let passHex = Utils.HexEncode(plainTextPassword)
        //console.log('-=-=-=-=-=-= plain text pw', plainTextPassword, passHex)
        pass = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(passHex)).toString('hex')
    } else {
        //console.log('=-=-=-=- NO PASSWORD')
        pass = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(APIKey)).toString('hex')
    }
    return pass
}

function GeneratePayloadFromSeed(seed: string, index: number, cb: any){
    var pk = bitcore.HDPrivateKey.fromSeed(seed, bitcore.Networks.mainnet)
    var d = pk.derive("m/0'/0/"+index, false)
    var address = d.privateKey.toAddress().toString()
    return cb(address, pk)
}
