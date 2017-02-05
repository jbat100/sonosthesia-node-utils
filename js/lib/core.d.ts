/// <reference types="chai" />
import { EventEmitter } from 'eventemitter3';
import * as Rx from 'rx';
export interface IConnection {
    messageObservable: Rx.Observable<Message>;
    sendJSON(message: any): any;
    sendMessage(message: Message): any;
}
export declare enum ConnectorState {
    None = 0,
    Started = 1,
    Stopped = 2,
    Error = 3,
}
export interface IConnector {
    emitter: EventEmitter;
}
export declare class NativeClass {
    static cloneInstance(instance: any): any;
    static checkInstanceClass(instance: any, klass: any): Chai.Assertion;
    readonly tag: string;
}
export declare class NativeEmitterClass extends EventEmitter {
    readonly tag: string;
}
export declare class MessageContentParser extends NativeClass {
    parse(type: string, content: any): any;
}
export declare class Message extends NativeClass {
    private _type;
    private _date;
    private _content;
    private _raw;
    static checkJSON(obj: any): void;
    static newFromJSON(obj: any, parser: MessageContentParser): Message;
    constructor(_type: string, _date: Date, _content: any);
    readonly type: string;
    readonly date: Date;
    readonly content: any;
    readonly raw: string;
    toJSON(): any;
}
export declare class Declarable extends NativeClass {
    private _identifier;
    private _live;
    private _info;
    static create(identifier: string, info: any): Declarable;
    constructor(identifier: string);
    readonly identifier: string;
    live: boolean;
    update(info: any): void;
    createReference(): void;
    _applyInfo(info: any): void;
}
export declare class Info extends NativeClass {
    private _identifier;
    static newFromJSON(obj: any): Info;
    readonly identifier: string;
    applyJSON(obj: any): void;
    toJSON(): any;
}
export declare class Selection {
    private _identifier;
    private _valid;
    constructor();
    identifier: string;
    valid: boolean;
}
export declare class Range extends NativeClass {
    private _min;
    private _max;
    static newFromJSON(obj: any): Range;
    constructor(_min: number, _max: number);
    min: number;
    max: number;
    check(): void;
    toJSON(): any;
}
export declare class GUID extends NativeClass {
    static generate(): string;
}
