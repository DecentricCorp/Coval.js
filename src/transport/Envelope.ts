import {CovalType} from "../base/Error"
let Errors = CovalType.Errors
/**
 * 
 * 
 * @export
 * @class Envelope
 * @extends {Errors}
 */
export class Envelope extends Errors {
    public value: any
    public AddValue(value: any){
        this.value = value
    }
    public GetValue(){
        return this.value
    }

    public toString() {
        return {
            value: this.value,
            errors: this.Errors()
        }
    }
}