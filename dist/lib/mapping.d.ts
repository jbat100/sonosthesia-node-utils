import { NativeClass } from './core';
import { ParameterOperator } from './parameter';
import { ChannelSelection, ParameterSelection } from './component';
export declare class ParameterConnection extends NativeClass {
    private _input;
    private _output;
    private _operators;
    constructor();
    readonly operators: ParameterOperator[];
    readonly input: ParameterSelection;
    readonly output: ParameterSelection;
    getOperator(index: any): ParameterOperator;
    addOperator(operator: any, index: any): void;
    removeOperator(index: any): void;
}
export declare class ChannelConnection extends NativeClass {
    private _input;
    private _output;
    private _parameterConnections;
    constructor();
    readonly input: ChannelSelection;
    readonly output: ChannelSelection;
    process(input: any): void;
}
export declare class MappingManager extends NativeClass {
    constructor();
}
