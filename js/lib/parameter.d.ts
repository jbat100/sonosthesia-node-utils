import { NativeClass } from './core';
export declare class ParameterSample extends NativeClass {
    private _values;
    private _timestamp;
    constructor(_values: number[], _timestamp?: number);
    readonly values: number[];
    readonly timestamp: number;
}
export declare class ParameterOperator extends NativeClass {
    static readonly name: string;
}
export declare class StatelessParameterOperator extends ParameterOperator {
    process(sample: ParameterSample): ParameterSample;
}
export declare class StatefulParameterOperator extends ParameterOperator {
    private _inputMemory;
    private _outputMemory;
    constructor(_inputMemory: number, _outputMemory: number);
    readonly inputMemory: number;
    readonly outputMemory: number;
    process(sample: ParameterSample, pastInputs: ParameterSample[], pastOutputs: ParameterSample[]): ParameterSample;
}
export declare class ParameterProcessor extends NativeClass {
    private _operator;
    constructor(_operator: ParameterOperator);
    readonly operator: ParameterOperator;
    process(sample: ParameterSample): ParameterSample;
}
export declare class StatelessParameterProcessor extends ParameterProcessor {
    process(sample: ParameterSample): ParameterSample;
}
export declare class StatefulParameterProcessor extends ParameterProcessor {
    private _pastInputs;
    private _pastOutputs;
    constructor(operator: ParameterOperator);
    process(sample: ParameterSample): ParameterSample;
}
export declare class ParameterProcessorFactory extends NativeClass {
    static newProcessorWithOperator(operator: ParameterOperator): ParameterProcessor;
}
export declare class ParameterProcessorChain extends NativeClass {
    private _processors;
    constructor(operators: ParameterOperator[]);
    process(sample: ParameterSample): ParameterSample;
}
