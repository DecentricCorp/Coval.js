"use strict"
export module CovalType {
    class Error {
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
        errors: Error[] = []
        
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
        private _internalAddError(error: Error){
            this.errors.push(error)
        }
        public AddError(error: string){
            
            this._internalAddError(new Error(error))
        }
    }

    /**
     * 
     * Collection of Error
     * @interface IErrors
     */
    interface IErrors {
        errors: Array<Error>
    }
}