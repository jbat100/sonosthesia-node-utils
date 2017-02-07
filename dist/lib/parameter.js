"use strict";
const _ = require("underscore");
const core_1 = require("./core");
class ParameterSample extends core_1.NativeClass {
    constructor(_values, _timestamp = Date.now()) {
        super();
        this._values = _values;
        this._timestamp = _timestamp;
    }
    get values() { return this._values; }
    get timestamp() { return this._timestamp; }
}
exports.ParameterSample = ParameterSample;
class ParameterOperator extends core_1.NativeClass {
    static get name() { return ''; }
}
exports.ParameterOperator = ParameterOperator;
class StatelessParameterOperator extends ParameterOperator {
    process(sample) {
        throw new Error('not implemented');
    }
}
exports.StatelessParameterOperator = StatelessParameterOperator;
class StatelessValueOperator extends StatelessParameterOperator {
    process(sample) {
        const values = _.map(sample.values, value => { return this._processValue(value); });
        return new ParameterSample(values, sample.timestamp);
    }
    _processValue(value) {
        throw new Error('not implemented');
    }
}
class StatelessArrayOperator extends StatelessParameterOperator {
    process(sample) {
        const values = this._processArray(sample.values);
        return new ParameterSample(values, sample.timestamp);
    }
    _processArray(values) {
        throw new Error('not implemented');
    }
}
class StatefulParameterOperator extends ParameterOperator {
    constructor(_inputMemory, _outputMemory) {
        super();
        this._inputMemory = _inputMemory;
        this._outputMemory = _outputMemory;
    }
    get inputMemory() { return this._inputMemory; }
    get outputMemory() { return this._outputMemory; }
    process(sample, pastInputs, pastOutputs) {
        throw new Error('not implemented');
    }
}
exports.StatefulParameterOperator = StatefulParameterOperator;
class ParameterProcessor extends core_1.NativeClass {
    constructor(_operator) {
        super();
        this._operator = _operator;
    }
    get operator() { return this._operator; }
    process(sample) {
        throw new Error('not implemented');
    }
}
exports.ParameterProcessor = ParameterProcessor;
class StatelessParameterProcessor extends ParameterProcessor {
    process(sample) {
        const operator = this.operator;
        return operator.process(sample);
    }
}
exports.StatelessParameterProcessor = StatelessParameterProcessor;
class StatefulParameterProcessor extends ParameterProcessor {
    constructor(operator) {
        super(operator);
        this._pastInputs = [];
        this._pastOutputs = [];
    }
    process(sample) {
        const operator = this.operator;
        const processed = operator.process(sample, this._pastInputs, this._pastOutputs);
        this._pastInputs.unshift(sample);
        this._pastOutputs.unshift(processed);
        if (this._pastInputs.length > operator.inputMemory)
            this._pastInputs.length = operator.inputMemory;
        if (this._pastOutputs.length > operator.outputMemory)
            this._pastOutputs.length = operator.outputMemory;
        return processed;
    }
}
exports.StatefulParameterProcessor = StatefulParameterProcessor;
class ParameterProcessorFactory extends core_1.NativeClass {
    static newProcessorWithOperator(operator) {
        if (operator.constructor === StatelessArrayOperator) {
            return new StatelessParameterProcessor(operator);
        }
        else if (operator.constructor === StatefulParameterOperator) {
            return new StatefulParameterProcessor(operator);
        }
        else {
            throw new Error('unsupported operator');
        }
    }
}
exports.ParameterProcessorFactory = ParameterProcessorFactory;
class ParameterProcessorChain extends core_1.NativeClass {
    constructor(operators) {
        super();
        this._processors = _.map(operators, operator => {
            return ParameterProcessorFactory.newProcessorWithOperator(operator);
        });
    }
    process(sample) {
        _.each(this._processors, processor => { sample = processor.process(sample); });
        return sample;
    }
}
exports.ParameterProcessorChain = ParameterProcessorChain;

//# sourceMappingURL=parameter.js.map
