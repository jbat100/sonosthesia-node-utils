"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("../core/core");
var ParameterOperator = require('./parameter').ParameterOperator;
var ParameterProcessor = require('./parameter').ParameterProcessor;
var ParameterProcessorChain = require('./parameter').ParameterProcessorChain;
var ChannelFlow = require('./component').ChannelFlow;
var ComponentInfo = require('./component').ComponentInfo;
var ChannelInfo = require('./component').ChannelInfo;
var ParameterInfo = require('./component').ParameterInfo;
var ComponentSelection = require('./component').ComponentSelection;
var ChannelSelection = require('./component').ChannelSelection;
var ParameterSelection = require('./component').ParameterSelection;
var ParameterConnection = (function (_super) {
    __extends(ParameterConnection, _super);
    function ParameterConnection() {
        var _this = _super.call(this) || this;
        _this._input = new ParameterSelection();
        _this._output = new ParameterSelection();
        _this._operators = [];
        return _this;
    }
    Object.defineProperty(ParameterConnection.prototype, "operators", {
        get: function () { return this._operators; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterConnection.prototype, "input", {
        get: function () { return this._input; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterConnection.prototype, "output", {
        get: function () { return this._output; },
        enumerable: true,
        configurable: true
    });
    ParameterConnection.prototype.getOperator = function (index) {
        return this._operators[index];
    };
    ParameterConnection.prototype.addOperator = function (operator, index) {
        core_1.NativeClass.checkInstanceClass(operator, ParameterOperator);
        this._operators.splice(index, 0, operator);
    };
    ParameterConnection.prototype.removeOperator = function (index) {
        this._operators.splice(index, 1);
    };
    return ParameterConnection;
}(core_1.NativeClass));
var ChannelConnection = (function (_super) {
    __extends(ChannelConnection, _super);
    function ChannelConnection() {
        var _this = this;
        _this._input = new ChannelSelection();
        _this._output = new ChannelSelection();
        _this._routes = [];
        return _this;
    }
    Object.defineProperty(ChannelConnection.prototype, "input", {
        get: function () { return this._input; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelConnection.prototype, "output", {
        get: function () { return this._output; },
        enumerable: true,
        configurable: true
    });
    ChannelConnection.prototype.process = function (input) {
    };
    return ChannelConnection;
}(core_1.NativeClass));
var MappingManager = (function (_super) {
    __extends(MappingManager, _super);
    function MappingManager() {
        var _this = this;
        return _this;
    }
    return MappingManager;
}(core_1.NativeClass));

//# sourceMappingURL=mapping.js.map
