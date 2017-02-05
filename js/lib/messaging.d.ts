import { NativeClass, MessageContentParser, Message } from './core';
import { ComponentInfo } from './component';
export declare class Parameters extends NativeClass {
    private _values;
    static newFromJSON(obj: any): Parameters;
    toJSON(): any;
    getKeys(): string[];
    setParameter(key: string, value: number[]): void;
    getParameter(key: string): number[];
}
export declare class MessageContent extends NativeClass {
    toJSON(): any;
}
export declare class ComponentMessageContent extends MessageContent {
    private _component;
    static newFromJSON(obj: any): ComponentMessageContent;
    constructor(_component: ComponentInfo);
    toJSON(): any;
    readonly component: ComponentInfo;
}
export declare class ChannelMessageContent extends MessageContent {
    private _component;
    private _channel;
    private _instance;
    private _key;
    private _parameters;
    static checkJSON(obj: any): void;
    static newFromJSON(obj: any): ChannelMessageContent;
    constructor(_component: string, _channel: string, _instance: string, _key: string, _parameters: Parameters);
    toJSON(): any;
    readonly component: string;
    readonly channel: string;
    readonly instance: string;
    readonly key: string;
    readonly parameters: Parameters;
    isInstanceMessage(): boolean;
}
export declare class ControlMessageContent extends ChannelMessageContent {
}
export declare class ActionMessageContent extends ChannelMessageContent {
    static checkJSON(obj: any): void;
}
export declare class InstanceMessageContent extends ChannelMessageContent {
    static checkJSON(obj: any): void;
}
export declare class CreateMessageContent extends InstanceMessageContent {
}
export declare class DestroyMessageContent extends InstanceMessageContent {
}
export declare enum HubMessageType {
    Component = 0,
    Action = 1,
    Control = 2,
    Create = 3,
    Destroy = 4,
}
export declare class HubMessage extends Message {
    static newFromJSON(obj: any, parser: MessageContentParser): Message;
    constructor(type: HubMessageType, date: Date, content: any);
    toJSON(): any;
}
export declare class HubMessageContentParser extends MessageContentParser {
    parse(type: string, content: any): any;
}
