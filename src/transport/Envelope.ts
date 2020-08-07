import "../base/Log";
import "../base/Msgs";
import { Msgs } from "../base/Msgs";

export class Envelope extends Msgs {
    public value: any
    public AddValue(_value: any){
        this.value = _value
    }
    public GetValue(){
        return this.value
    }

    public toString() {
        return {
            value: this.value,
            errors: this.Errors(),
            logs: this.EnvLogs().env_logs
        }
    }
}