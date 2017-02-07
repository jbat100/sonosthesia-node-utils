"use strict";
const core_1 = require("./core");
const parameter_1 = require("./parameter");
const component_1 = require("./component");
class ParameterConnection extends core_1.NativeClass {
    constructor() {
        super();
        this._input = new component_1.ParameterSelection();
        this._output = new component_1.ParameterSelection();
        this._operators = [];
    }
    get operators() { return this._operators; }
    get input() { return this._input; }
    get output() { return this._output; }
    getOperator(index) {
        return this._operators[index];
    }
    addOperator(operator, index) {
        core_1.NativeClass.checkInstanceClass(operator, parameter_1.ParameterOperator);
        this._operators.splice(index, 0, operator);
    }
    removeOperator(index) {
        this._operators.splice(index, 1);
    }
}
exports.ParameterConnection = ParameterConnection;
class ChannelConnection extends core_1.NativeClass {
    constructor() {
        super();
        this._input = new component_1.ChannelSelection();
        this._output = new component_1.ChannelSelection();
        this._parameterConnections = [];
    }
    get input() { return this._input; }
    get output() { return this._output; }
    process(input) {
    }
}
exports.ChannelConnection = ChannelConnection;
class MappingManager extends core_1.NativeClass {
    constructor() {
        super();
    }
}
exports.MappingManager = MappingManager;

//# sourceMappingURL=mapping.js.map
