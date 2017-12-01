import {CovalType} from "../build/Error"
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
        Envelope.value = value
    }
    public GetValue(){
        return Envelope.value
    }

    public toString() {
        return {
            value: Envelope.value,
            errors: this.Errors()
        }
    }
}