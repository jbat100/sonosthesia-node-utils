"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("underscore");
var core_1 = require("../core/core");
var ParameterSample = (function (_super) {
    __extends(ParameterSample, _super);
    function ParameterSample(_values, _timestamp) {
        var _this = this;
        _this._values = _values;
        _this._timestamp = _timestamp;
        _this._timestamp = Date.now();
        if (!_this.timestamp)
            _this._timestamp = Date.now();
        return _this;
    }
    Object.defineProperty(ParameterSample.prototype, "values", {
        get: function () { return this._values; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterSample.prototype, "timestamp", {
        get: function () { return this._timestamp; },
        enumerable: true,
        configurable: true
    });
    return ParameterSample;
}(core_1.NativeClass));
exports.ParameterSample = ParameterSample;
var ParameterOperator = (function (_super) {
    __extends(ParameterOperator, _super);
    function ParameterOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ParameterOperator, "name", {
        get: function () { return ''; },
        enumerable: true,
        configurable: true
    });
    return ParameterOperator;
}(core_1.NativeClass));
exports.ParameterOperator = ParameterOperator;
var StatelessParameterOperator = (function (_super) {
    __extends(StatelessParameterOperator, _super);
    function StatelessParameterOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessParameterOperator.prototype.process = function (sample) {
        throw new Error('not implemented');
    };
    return StatelessParameterOperator;
}(ParameterOperator));
exports.StatelessParameterOperator = StatelessParameterOperator;
var StatelessValueOperator = (function (_super) {
    __extends(StatelessValueOperator, _super);
    function StatelessValueOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessValueOperator.prototype.process = function (sample) {
        var _this = this;
        var values = _.map(sample.values, function (value) { return _this._processValue(value); });
        return new ParameterSample(values, sample.timestamp);
    };
    StatelessValueOperator.prototype._processValue = function (value) {
        throw new Error('not implemented');
    };
    return StatelessValueOperator;
}(StatelessParameterOperator));
var StatelessArrayOperator = (function (_super) {
    __extends(StatelessArrayOperator, _super);
    function StatelessArrayOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessArrayOperator.prototype.process = function (sample) {
        var values = this._processArray(sample.values);
        return new ParameterSample(values, sample.timestamp);
    };
    StatelessArrayOperator.prototype._processArray = function (values) {
        throw new Error('not implemented');
    };
    return StatelessArrayOperator;
}(StatelessParameterOperator));
var StatefulParameterOperator = (function (_super) {
    __extends(StatefulParameterOperator, _super);
    function StatefulParameterOperator(_inputMemory, _outputMemory) {
        var _this = this;
        _this._inputMemory = _inputMemory;
        _this._outputMemory = _outputMemory;
        return _this;
    }
    Object.defineProperty(StatefulParameterOperator.prototype, "inputMemory", {
        get: function () { return this._inputMemory; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatefulParameterOperator.prototype, "outputMemory", {
        get: function () { return this._outputMemory; },
        enumerable: true,
        configurable: true
    });
    StatefulParameterOperator.prototype.process = function (sample, pastInputs, pastOutputs) {
        throw new Error('not implemented');
    };
    return StatefulParameterOperator;
}(ParameterOperator));
exports.StatefulParameterOperator = StatefulParameterOperator;
var ParameterProcessor = (function (_super) {
    __extends(ParameterProcessor, _super);
    function ParameterProcessor(operator) {
        var _this = _super.call(this) || this;
        _this._operator = operator;
        return _this;
    }
    Object.defineProperty(ParameterProcessor.prototype, "operator", {
        get: function () { return this._operator; },
        enumerable: true,
        configurable: true
    });
    ParameterProcessor.prototype.process = function (sample) {
        throw new Error('not implemented');
    };
    return ParameterProcessor;
}(core_1.NativeClass));
exports.ParameterProcessor = ParameterProcessor;
var StatelessParameterProcessor = (function (_super) {
    __extends(StatelessParameterProcessor, _super);
    function StatelessParameterProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessParameterProcessor.prototype.process = function (sample) {
        var operator = this.operator;
        return operator.process(sample);
    };
    return StatelessParameterProcessor;
}(ParameterProcessor));
exports.StatelessParameterProcessor = StatelessParameterProcessor;
var StatefulParameterProcessor = (function (_super) {
    __extends(StatefulParameterProcessor, _super);
    function StatefulParameterProcessor(operator) {
        var _this = _super.call(this, operator) || this;
        _this._pastInputs = [];
        _this._pastOutputs = [];
        return _this;
    }
    StatefulParameterProcessor.prototype.process = function (sample) {
        var operator = this.operator;
        var processed = operator.process(sample, this._pastInputs, this._pastOutputs);
        if (this.operator.memory > 0) {
            this._pastInputs.unshift(sample);
            this._pastOutputs.unshift(processed);
            if (this._pastInputs.length > operator.inputMemory)
                this._pastInputs.length = operator.inputMemory;
            if (this._pastOutputs.length > operator.outputMemory)
                this._pastOutputs.length = operator.outputMemory;
        }
        return output;
    };
    return StatefulParameterProcessor;
}(ParameterProcessor));
exports.StatefulParameterProcessor = StatefulParameterProcessor;
var ParameterProcessorFactory = (function (_super) {
    __extends(ParameterProcessorFactory, _super);
    function ParameterProcessorFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParameterProcessorFactory.newProcessorWithOperator = function (operator) {
        if (operator.constructor === StatelessArrayOperator) {
            return new StatelessParameterProcessor(operator);
        }
        else if (operator.constructor === StatefulArrayOperator) {
            return new StatefulParameterProcessor(operator);
        }
        else {
            throw new Error('unsuported operator');
        }
    };
    return ParameterProcessorFactory;
}(core_1.NativeClass));
exports.ParameterProcessorFactory = ParameterProcessorFactory;
var ParameterProcessorChain = (function (_super) {
    __extends(ParameterProcessorChain, _super);
    function ParameterProcessorChain(operators) {
        var _this = this;
        _this._processors = _.map(operators, function (operator) {
            return ParameterProcessorFactory.newProcessorWithOperator(operator);
        });
        return _this;
    }
    ParameterProcessorChain.prototype.process = function (sample) {
        _.each(this._processors, function (processor) { sample = processor.process(sample); });
        return sample;
    };
    return ParameterProcessorChain;
}(core_1.NativeClass));
exports.ParameterProcessorChain = ParameterProcessorChain;

//# sourceMappingURL=parameter.js.map
