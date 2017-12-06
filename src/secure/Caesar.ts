"use strict"
declare const Buffer
import * as CaesarLib from 'caesar'
export class Caesar {
    constructor() { }

    public CreatePrivate() {
        return CaesarLib.key.createPrivate()
    }

    public CreateRandom() {
        return CaesarLib.key.createRandom()
    }

    public CreateKtsSigner(threshold: number, key?) {
        if (key) {
            return new CaesarLib.kts.Signer(threshold, key)
        }
        return new CaesarLib.kts.Signer(threshold)
    }

    public CreateKtsVerifier(pubKey) {
        return new CaesarLib.kts.Verifier(pubKey)
    }

    public CreateXtsEncrypter(key) {
        return new XtsEncryptor(key)

    }

    public CreateXtsDecrypter(key) {
        return new XtsDecrypter(key)
    }
}

export class XtsEncryptor {
    public encrypter
    constructor(key) {
        this.encrypter = new CaesarLib.message.XTSEncrypter(key)
    }
    public write(buffer, cb) {
        this.encrypter.write(buffer)
        this.encrypter.on('data', (chunk) => {
            cb(chunk)
        })
    }
}

export class XtsDecrypter {
    public decrypter
    private decryptedChunks: string = '';
    constructor(key) {
        this.decrypter = new CaesarLib.message.XTSDecrypter(key)
    }
    registeredActivity = false
    Activity(msgBufferLength, cb) {
        this.decrypter.on('data', (chunk) => {
            if (this.decryptedChunks.length + 32 > msgBufferLength) {
                var extra = this.decryptedChunks.length + 32 - msgBufferLength
                var sliceAt = 32 - extra
                chunk = chunk.slice(0, sliceAt)
                this.decryptedChunks += chunk
                return cb(this.decryptedChunks)
            }
            this.decryptedChunks += chunk
        })
    }

    public write(buffer, msgBufferLength: number, cb) {
        if (!this.registeredActivity) {
            this.Activity(msgBufferLength, cb)
            this.registeredActivity = true
        }
        this.decrypter.write(buffer)
    }





}