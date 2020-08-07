/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class DatManager {
    _datnodes: {
        [index: string]: DatNode;
    };
    constructor();
    getDatNode(id: string): DatNode;
    createDatNode(id: string, archive: string | {}, options: {}): Promise<DatNode>;
    disposeDatNode(id: string): Promise<DatNode>;
    shutdown(): Promise<any>;
}
export declare class DatNode extends EventEmitter {
    _id: string;
    _archive: string | {};
    _options: {
        [index: string]: any;
    };
    _dat: any;
    _stats: any;
    constructor(id: string, archive: string | {}, options: {
        [index: string]: any;
    });
    getArchiveKey(): string;
    getID(): string;
    peerFound(): boolean;
    peerSearching(): boolean;
    peerNotFound(): boolean;
    initializeArchive(callback?: (datnode: DatNode, err?: {}) => void): Promise<DatNode>;
    joinNetwork(callback?: (datnode: DatNode, err?: {}) => void): Promise<DatNode>;
    importFiles(callback?: (datnode: DatNode, err?: {}) => void): Promise<DatNode>;
    close(callback?: (datnode: DatNode) => void): Promise<DatNode>;
}
