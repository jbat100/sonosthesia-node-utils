/// <reference types="node" />
/// <reference types="q" />
import * as net from 'net';
import * as Q from 'q';
import * as Rx from 'rx';
import { NativeClass, Message, MessageContentParser, IConnection } from './core';
export declare class TCPConnector extends NativeClass {
    private _parser;
    readonly verbose: boolean;
    private _error;
    private _server;
    private _connections;
    private _emitter;
    constructor(_parser: MessageContentParser);
    readonly server: net.Server;
    readonly error: Error;
    readonly emitter: any;
    readonly parser: MessageContentParser;
    start(port: any): Q.Promise<void>;
    stop(): Q.Promise<void>;
    destroyConnection(connection: any): void;
}
export declare class TCPConnection extends NativeClass implements IConnection {
    private _connector;
    private _socket;
    private _parser;
    readonly verbose: boolean;
    private _lineInputStream;
    private _messageSubject;
    private _messageObservable;
    private _identifier;
    constructor(_connector: TCPConnector, _socket: net.Socket, _parser: MessageContentParser);
    readonly tag: string;
    readonly identifier: string;
    readonly jsonDelimiter: string;
    readonly messageObservable: Rx.Observable<Message>;
    readonly socket: net.Socket;
    readonly connector: TCPConnector;
    readonly parser: MessageContentParser;
    sendJSON(obj: any): void;
    sendMessage(message: Message): void;
}
