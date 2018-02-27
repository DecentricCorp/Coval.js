/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class DatManager extends EventEmitter {
    private _datnodes;
    createOutgoingArchive(archivePath: string, callback?: (datman: DatManager, datnode: DatNode, error?: any) => void): void;
    createTransientOutgoingArchive(archivePath: string, callback?: (datman: DatManager, datnode: DatNode, error?: any) => void): void;
    createIncomingArchive(key: string, archivePath: string, callback?: (datman: DatManager, datnode: DatNode, error?: any) => void): void;
    createTransientIncomingArchive(key: string, callback?: (datman: DatManager, datnode: DatNode, error?: any) => void): void;
    createDatNode(archive: string | {}, options: {}, callback?: (datman: DatManager, datnode: DatNode, error?: any) => void): void;
    getDatNode(key: string, callback?: (datman: DatManager, datnode: DatNode) => void): any;
    getDatNodes(): {};
    disposeDatNode(key: string, callback?: (datman: DatManager, datnode: DatNode) => void): void;
    shutdown(): void;
}
export declare class DatNode extends EventEmitter {
    _dat: any;
    _key: string;
    _stats: any;
    constructor(dat: any);
    getKey(): string;
    importFiles(callback?: (datnode: DatNode, err?: {}) => void): void;
    close(callback?: (datnode: DatNode) => void): void;
}
