"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("underscore");
var chai_1 = require("chai");
var core_1 = require("../core/core");
var ComponentInfo = (function (_super) {
    __extends(ComponentInfo, _super);
    function ComponentInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentInfo.prototype.applyJSON = function (obj) {
        _super.prototype.applyJSON.call(this, obj);
        chai_1.expect(obj.channels).to.be.instanceof(Array);
        this._channels = _.map(obj.channels, function (channel) { return ChannelInfo.newFromJSON(channel); });
    };
    Object.defineProperty(ComponentInfo.prototype, "channels", {
        get: function () { return this._channels; },
        enumerable: true,
        configurable: true
    });
    ComponentInfo.prototype.makeJSON = function () {
        var obj = _super.prototype.makeJSON.call(this);
        obj['channels'] = _.map(this.channels, function (channel) { return channel.makeJSON(); });
        return obj;
    };
    return ComponentInfo;
}(core_1.Info));
exports.ComponentInfo = ComponentInfo;
var ChannelFlow;
(function (ChannelFlow) {
    ChannelFlow[ChannelFlow["Emitter"] = 0] = "Emitter";
    ChannelFlow[ChannelFlow["Receiver"] = 1] = "Receiver";
})(ChannelFlow = exports.ChannelFlow || (exports.ChannelFlow = {}));
var ChannelInfo = (function (_super) {
    __extends(ChannelInfo, _super);
    function ChannelInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._flow = ChannelFlow.Emitter;
        _this._producer = false;
        return _this;
    }
    ChannelInfo.prototype.applyJSON = function (obj) {
        _super.prototype.applyJSON.call(this, obj);
        chai_1.expect(obj.parameters).to.be.instanceof(Array);
        this._parameters = _.map(obj.parameters, function (parameter) { return ParameterInfo.newFromJSON(parameter); });
        chai_1.expect(ChannelFlow[obj.flow]).to.be.ok;
        this._flow = ChannelFlow[obj.flow];
        chai_1.expect(obj.producer).to.be.a('boolean');
        this._producer = obj.producer;
    };
    Object.defineProperty(ChannelInfo.prototype, "flow", {
        get: function () { return this._flow; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelInfo.prototype, "producer", {
        get: function () { return this._producer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelInfo.prototype, "parameters", {
        get: function () { return this._parameters; },
        enumerable: true,
        configurable: true
    });
    ChannelInfo.prototype.makeJSON = function () {
        var obj = _super.prototype.makeJSON.call(this);
        obj.flow = ChannelFlow[this.flow];
        obj.producer = this.producer;
        obj.parameters = _.map(this.parameters, function (parameter) { return parameter.makeJSON(); });
        return obj;
    };
    return ChannelInfo;
}(core_1.Info));
exports.ChannelInfo = ChannelInfo;
var ParameterInfo = (function (_super) {
    __extends(ParameterInfo, _super);
    function ParameterInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._defaultValue = 0.0;
        return _this;
    }
    ParameterInfo.prototype.applyJSON = function (obj) {
        _super.prototype.applyJSON.call(this, obj);
        chai_1.expect(obj.defaultValue).to.be.a('number');
        this._defaultValue = obj.defaultValue;
        this._range = core_1.Range.newFromJSON(obj.range);
    };
    Object.defineProperty(ParameterInfo.prototype, "defaultValue", {
        get: function () { return this._defaultValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterInfo.prototype, "range", {
        get: function () { return this._range; },
        enumerable: true,
        configurable: true
    });
    ParameterInfo.prototype.makeJSON = function () {
        var obj = _super.prototype.makeJSON.call(this);
        obj.defaultValue = this.defaultValue;
        obj.range = this.range.makeJSON();
        return obj;
    };
    return ParameterInfo;
}(core_1.Info));
exports.ParameterInfo = ParameterInfo;
var ComponentSelection = (function (_super) {
    __extends(ComponentSelection, _super);
    function ComponentSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ComponentSelection;
}(core_1.Selection));
exports.ComponentSelection = ComponentSelection;
var ChannelSelection = (function (_super) {
    __extends(ChannelSelection, _super);
    function ChannelSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._component = new ComponentSelection();
        return _this;
    }
    Object.defineProperty(ChannelSelection.prototype, "component", {
        get: function () { return this._component; },
        enumerable: true,
        configurable: true
    });
    return ChannelSelection;
}(core_1.Selection));
exports.ChannelSelection = ChannelSelection;
var ParameterSelection = (function (_super) {
    __extends(ParameterSelection, _super);
    function ParameterSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._channel = new ChannelSelection();
        return _this;
    }
    Object.defineProperty(ParameterSelection.prototype, "channel", {
        get: function () { return this._channel; },
        enumerable: true,
        configurable: true
    });
    return ParameterSelection;
}(core_1.Selection));
exports.ParameterSelection = ParameterSelection;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(_connection, _info) {
        var _this = _super.call(this) || this;
        _this._connection = _connection;
        _this._info = _info;
        return _this;
    }
    Object.defineProperty(Component.prototype, "connection", {
        get: function () { return this._connection; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "info", {
        get: function () { return this._info; },
        set: function (info) { this._info = info; },
        enumerable: true,
        configurable: true
    });
    return Component;
}(core_1.NativeClass));
exports.Component = Component;
var ComponentManager = (function (_super) {
    __extends(ComponentManager, _super);
    function ComponentManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._components = new Map();
        return _this;
    }
    ComponentManager.prototype.registerComponent = function (connection, info) {
        var component = this._components.get(info.identifier);
        if (!(info && info.identifier))
            throw new Error('invalid identifier');
        if (component) {
            if (component.connection === connection)
                throw new Error('duplicate component declaration');
        }
        else {
            component = new Component(connection, info);
            this._components.set(info.identifier, component);
        }
        component.info = info;
    };
    ComponentManager.prototype.unregisterComponent = function (connection, identifier) {
        var component = this._components.get(identifier);
        if (!component) {
            throw new Error('unknown component identifier : ' + identifier);
        }
        else if (component.connection !== connection) {
            throw new Error('component ' + identifier + ' is not associated with connection');
        }
        this._components.delete(identifier);
    };
    ComponentManager.prototype.getComponent = function (identifier, required) {
        if (required !== false)
            required = true;
        var result = this._components.get(identifier);
        if ((!result) && required)
            throw new Error('unknown component identifier : ' + identifier);
        return result;
    };
    ComponentManager.prototype.getComponents = function (connection) {
        if (required !== false)
            required = true;
        var components = [];
        for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
            var _b = _a[_i], identifier = _b[0], component = _b[1];
            if (component.connection === connection)
                components.push(component);
        }
        return components;
    };
    ComponentManager.prototype.clean = function (connection) {
        var identifiers = this.getComponents(connection).map(function (component) {
            return component.info.identifier;
        });
        for (var _i = 0, identifiers_1 = identifiers; _i < identifiers_1.length; _i++) {
            var identifier = identifiers_1[_i];
            this._components.delete(identifier);
        }
    };
    return ComponentManager;
}(core_1.NativeClass));
exports.ComponentManager = ComponentManager;

//# sourceMappingURL=component.js.map
