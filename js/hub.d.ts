/// <reference types="q" />
import * as Q from "q";
import { NativeClass } from "../core/core";
import { Configuration } from './configuration';
import { IConnector, IConnection } from "../core/interface";
export declare class HubManager extends NativeClass {
    private _configuration;
    private _connector;
    private _messageContentParser;
    private _componentManager;
    constructor(_configuration: Configuration, _connector: IConnector);
    readonly configuration: Configuration;
    readonly connector: any;
    setup(): Q.Promise<void>;
    teardown(): Q.Promise<void>;
    setupConnection(connection: IConnection): void;
    getComponent(identifier: any): void;
}
