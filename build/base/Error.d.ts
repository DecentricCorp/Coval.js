export declare class BaseError {
    message: string;
    /**
     * Creates an instance of Error.
     * @param {string} message
     * @memberof Error
     */
    constructor(message: string);
}
export declare class MultichainError extends Error {
    cause: any;
    constructor(cause: any);
}
export declare class Errors implements IErrors {
    errors: any[];
    Errors(): any[];
    HasErrors(): boolean;
    /**
     * Internal because Error interface is
     * @param error
     */
    private _internalAddError(error);
    AddError(error: string): void;
}
/**
 *
 * Collection of Error
 * @interface IErrors
 */
export interface IErrors {
    errors: Array<BaseError>;
}
