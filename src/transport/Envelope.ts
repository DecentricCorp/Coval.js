import { Logs } from "../base/Log";
import { Msgs } from "../base/Msgs";
/**
 * 
 * 
 * @export
 * @class Envelope
 * @extends {Errors}
 */
export class Envelope extends Msgs {
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
            errors: this.Errors(),
            logs: this.Logs().logs
        }
    }
}