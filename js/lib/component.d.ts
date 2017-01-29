import { NativeClass, Info, Selection, Range, IConnection } from "./core";
export declare class ComponentInfo extends Info {
    private _channels;
    applyJSON(obj: any): void;
    readonly channels: ChannelInfo[];
    makeJSON(): any;
}
export declare enum ChannelFlow {
    Undefined = 0,
    Emitter = 1,
    Receiver = 2,
}
export declare enum ChannelType {
    Undefined = 0,
    Event = 1,
    Control = 2,
    Generator = 3,
}
export declare class ChannelInfo extends Info {
    private _flow;
    private _type;
    private _parameters;
    applyJSON(obj: any): void;
    readonly flow: ChannelFlow;
    readonly type: ChannelType;
    readonly parameters: ParameterInfo[];
    makeJSON(): any;
}
export declare class ParameterInfo extends Info {
    private _defaultValue;
    private _range;
    applyJSON(obj: any): void;
    readonly defaultValue: number;
    readonly range: Range;
    makeJSON(): any;
}
export declare class ComponentSelection extends Selection {
}
export declare class ChannelSelection extends Selection {
    private _component;
    readonly component: ComponentSelection;
}
export declare class ParameterSelection extends Selection {
    private _channel;
    readonly channel: ChannelSelection;
}
export declare class Component extends NativeClass {
    private _connection;
    private _info;
    constructor(_connection: IConnection, _info: ComponentInfo);
    readonly connection: IConnection;
    info: ComponentInfo;
}
export declare class ComponentManager extends NativeClass {
    private _components;
    registerComponent(connection: IConnection, info: ComponentInfo): void;
    unregisterComponent(connection: IConnection, identifier: string): void;
    getComponent(identifier: string, required?: boolean): Component;
    getComponents(connection: IConnection, required?: boolean): Component[];
    clean(connection: IConnection): void;
}
