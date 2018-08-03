export declare class Log {
    message: string;
    constructor(message: string);
}
export declare class Logs implements ILogs {
    env_logs: any[];
    _Logs(): any[];
    HasLogs(): boolean;
    private _internalAddError;
    AddError(_log: string): void;
}
/**
 *
 * Collection of Error
 * @interface ILogs
 */
export interface ILogs {
    env_logs: Array<Log>;
}
