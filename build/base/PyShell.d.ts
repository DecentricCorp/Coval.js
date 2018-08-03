export declare class PyShell {
    script?: string;
    options?: PyShellOptions;
    Interactive: any;
    constructor(script?: string, options?: PyShellOptions);
    Run(script: string, callback?: any): void;
    Send(input: string, callback: any): void;
    End(callback: any): void;
}
export declare class PyShellOptions {
    mode?: Mode;
    pythonPath?: string;
    pythonOptions?: string[];
    scriptPath?: string;
    args?: string[];
    constructor(mode?: Mode, pythonPath?: string, pythonOptions?: string[], scriptPath?: string, args?: string[]);
}
export declare enum Mode {
    Text = "text",
    Json = "json",
    Binary = "binary"
}
