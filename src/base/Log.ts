"use strict"
export class Log {
    /**
     * Creates an instance of Log.
     * @param {string} message 
     * @memberof Log
     */
    constructor(public message: string ) {
        this.message = message
    }
}

export class Logs implements ILogs {
    logs: Log[] = []
    
    public Logs() {
        return this.logs
    }
    public HasLogs() {
        return this.logs.length > 0
    }
    /**
     * Internal because Error interface is 
     * @param log 
     */
    private _internalAddError(log: Log){
        this.logs.push(log)
    }
    public AddError(log: string){
        
        this._internalAddError(new Log(log))
    }
}

/**
 * 
 * Collection of Error
 * @interface ILogs
 */
interface ILogs {
    logs: Array<Log>
}