"use strict"

import {Logs} from "../base/Log"
//export module CovalType {
    export class BaseError {
        /**
         * Creates an instance of Error.
         * @param {string} message 
         * @memberof Error
         */
        constructor(public message: string ) {
            this.message = message
        }
    }

    export class Errors implements IErrors {
        errors = []
        
        public Errors() {
            return this.errors
        }
        public HasErrors() {
            return this.errors.length > 0
        }
        /**
         * Internal because Error interface is 
         * @param error 
         */
        private _internalAddError(error: BaseError){
            this.errors.push(error)
        }
        public AddError(error: string){
            
            this._internalAddError(new BaseError(error))
        }
    }

    /**
     * 
     * Collection of Error
     * @interface IErrors
     */
    export interface IErrors {
        errors: Array<BaseError>
    }
//}