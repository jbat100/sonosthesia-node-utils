import { NativeClass, MessageContentParser } from './core';
import { ComponentInfo } from './component';
export declare class Parameters extends NativeClass {
    private _values;
    static newFromJson(obj: any): Parameters;
    getKeys(): string[];
    setParameter(key: string, value: number[]): void;
    getParameter(key: string): number[];
}
export declare class MessageContent extends NativeClass {
}
export declare class ComponentMessageContent extends MessageContent {
    private _component;
    static newFromJson(obj: any): ComponentMessageContent;
    constructor(_component: ComponentInfo);
    readonly component: ComponentInfo;
}
export declare class ChannelMessageContent extends MessageContent {
    private _component;
    private _channel;
    private _object;
    private _parameters;
    static newFromJson(obj: any): ChannelMessageContent;
    constructor(_component: string, _channel: string, _object: string, _parameters: Parameters);
    readonly component: string;
    readonly channel: string;
    readonly object: string;
    readonly parameters: Parameters;
}
export declare class ControlMessageContent extends ChannelMessageContent {
}
export declare class ActionMessageContent extends ChannelMessageContent {
}
export declare class ObjectMessageContent extends ChannelMessageContent {
    constructor(component: string, channel: string, object: string, parameters: Parameters);
}
export declare class CreateMessageContent extends ObjectMessageContent {
}
export declare class DestroyMessageContent extends ObjectMessageContent {
}
export declare enum HubMessageType {
    component = 0,
    action = 1,
    control = 2,
    create = 3,
    destroy = 4,
}
export declare class HubMessageContentParser extends MessageContentParser {
    private _contentClasses;
    parse(type: string, content: any): any;
}
