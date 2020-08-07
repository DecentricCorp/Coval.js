"use strict"
export class Log {
    constructor(public message: string ) {
        this.message = message
    }
}

export class Logs implements ILogs {
    public env_logs = []
    
    public _Logs() {
        return this.env_logs
    }
    public HasLogs() {
        return this.env_logs.length > 0
    }
    private _internalAddError(_log: Log){
        this.env_logs.push(_log)
    }
    public AddError(_log: string){        
        this._internalAddError(new Log(_log))
    }
}

/**
 * 
 * Collection of Error
 * @interface ILogs
 */
export interface ILogs {
    env_logs: Array<Log>
}