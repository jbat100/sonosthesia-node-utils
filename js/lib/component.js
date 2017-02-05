"use strict";
const _ = require("underscore");
const chai_1 = require("chai");
const core_1 = require("./core");
class ComponentInfo extends core_1.Info {
    applyJSON(obj) {
        super.applyJSON(obj);
        chai_1.expect(obj.channels).to.be.instanceof(Array);
        this._channels = _.map(obj.channels, channel => { return ChannelInfo.newFromJSON(channel); });
    }
    get channels() { return this._channels; }
    toJSON() {
        const obj = super.toJSON();
        obj['channels'] = _.map(this.channels, (channel) => { return channel.toJSON(); });
        return obj;
    }
}
exports.ComponentInfo = ComponentInfo;
var ChannelFlow;
(function (ChannelFlow) {
    ChannelFlow[ChannelFlow["Undefined"] = 0] = "Undefined";
    ChannelFlow[ChannelFlow["Emitter"] = 1] = "Emitter";
    ChannelFlow[ChannelFlow["Receiver"] = 2] = "Receiver";
})(ChannelFlow = exports.ChannelFlow || (exports.ChannelFlow = {}));
var ChannelType;
(function (ChannelType) {
    ChannelType[ChannelType["Undefined"] = 0] = "Undefined";
    ChannelType[ChannelType["Event"] = 1] = "Event";
    ChannelType[ChannelType["Control"] = 2] = "Control";
    ChannelType[ChannelType["Generator"] = 3] = "Generator";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
class ChannelInfo extends core_1.Info {
    constructor() {
        super(...arguments);
        this._flow = ChannelFlow.Emitter;
        this._type = ChannelType.Event;
    }
    applyJSON(obj) {
        super.applyJSON(obj);
        chai_1.expect(obj.parameters).to.be.instanceof(Array);
        this._parameters = _.map(obj.parameters, parameter => {
            return ParameterInfo.newFromJSON(parameter);
        });
        chai_1.expect(ChannelFlow[obj.flow]).to.be.ok;
        this._flow = ChannelFlow[obj.flow];
        chai_1.expect(ChannelType[obj.type]).to.be.ok;
        this._type = ChannelType[obj.type];
    }
    get flow() { return this._flow; }
    get type() { return this._type; }
    get parameters() { return this._parameters; }
    toJSON() {
        const obj = super.toJSON();
        obj.flow = ChannelFlow[this.flow];
        obj.producer = ChannelType[this.type];
        obj.parameters = _.map(this.parameters, (parameter) => {
            return parameter.toJSON();
        });
        return obj;
    }
}
exports.ChannelInfo = ChannelInfo;
class ParameterInfo extends core_1.Info {
    constructor() {
        super(...arguments);
        this._defaultValue = 0.0;
    }
    applyJSON(obj) {
        super.applyJSON(obj);
        chai_1.expect(obj.defaultValue).to.be.a('number');
        this._defaultValue = obj.defaultValue;
        this._range = core_1.Range.newFromJSON(obj.range);
    }
    get defaultValue() { return this._defaultValue; }
    get range() { return this._range; }
    toJSON() {
        const obj = super.toJSON();
        obj.defaultValue = this.defaultValue;
        obj.range = this.range.toJSON();
        return obj;
    }
}
exports.ParameterInfo = ParameterInfo;
class ComponentSelection extends core_1.Selection {
}
exports.ComponentSelection = ComponentSelection;
class ChannelSelection extends core_1.Selection {
    constructor() {
        super(...arguments);
        this._component = new ComponentSelection();
    }
    get component() { return this._component; }
}
exports.ChannelSelection = ChannelSelection;
class ParameterSelection extends core_1.Selection {
    constructor() {
        super(...arguments);
        this._channel = new ChannelSelection();
    }
    get channel() { return this._channel; }
}
exports.ParameterSelection = ParameterSelection;
class Component extends core_1.NativeClass {
    constructor(_connection, _info) {
        super();
        this._connection = _connection;
        this._info = _info;
    }
    get connection() { return this._connection; }
    get info() { return this._info; }
    set info(info) { this._info = info; }
}
exports.Component = Component;
class ComponentManager extends core_1.NativeClass {
    constructor() {
        super(...arguments);
        this._components = new Map();
    }
    registerComponent(connection, info) {
        let component = this._components.get(info.identifier);
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
    }
    unregisterComponent(connection, identifier) {
        let component = this._components.get(identifier);
        if (!component) {
            throw new Error('unknown component identifier : ' + identifier);
        }
        else if (component.connection !== connection) {
            throw new Error('component ' + identifier + ' is not associated with connection');
        }
        this._components.delete(identifier);
    }
    getComponent(identifier, required) {
        if (required !== false)
            required = true;
        const result = this._components.get(identifier);
        if ((!result) && required)
            throw new Error('unknown component identifier : ' + identifier);
        return result;
    }
    getComponents(connection, required) {
        if (required !== false)
            required = true;
        const components = [];
        this._components.forEach((component, identifier) => {
            if (component.connection === connection)
                components.push(component);
        });
        return components;
    }
    clean(connection) {
        const identifiers = this.getComponents(connection).map((component) => {
            return component.info.identifier;
        });
        for (let identifier of identifiers) {
            this._components.delete(identifier);
        }
    }
}
exports.ComponentManager = ComponentManager;

//# sourceMappingURL=component.js.map
