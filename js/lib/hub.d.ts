/// <reference types="q" />
import * as Q from "q";
import { NativeClass, IConnector, IConnection } from "./core";
import { Configuration } from './configuration';
import { ComponentManager } from "./component";
export declare class HubManager extends NativeClass {
    private _configuration;
    private _connector;
    private _messageContentParser;
    private _componentManager;
    constructor(_configuration: Configuration, _connector: IConnector);
    readonly configuration: Configuration;
    readonly componentManager: ComponentManager;
    readonly connector: IConnector;
    setup(): Q.Promise<void>;
    teardown(): Q.Promise<void>;
    setupConnection(connection: IConnection): void;
}
