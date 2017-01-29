"use strict";
const _ = require("underscore");
const chai_1 = require("chai");
const core_1 = require("./core");
const component_1 = require("./component");
class Parameters extends core_1.NativeClass {
    constructor() {
        super(...arguments);
        this._values = {};
    }
    static newFromJson(obj) {
        chai_1.expect(obj).to.be.an('object');
        const parameters = new this();
        _.each(obj, (value, key) => {
            chai_1.expect(key).to.be.a('string');
            if (typeof value === 'number')
                value = [value];
            if (!_.isArray(value))
                throw new Error('value should be number or array');
            parameters.setParameter(key, value);
        });
        return parameters;
    }
    getKeys() {
        return _.keys(this._values);
    }
    setParameter(key, value) {
        if (!key)
            throw new Error('invalid key');
        this._values[key] = value;
    }
    getParameter(key) {
        if (!_.has(this._values, key))
            throw new Error('unknown key');
        return this._values[key];
    }
}
exports.Parameters = Parameters;
class MessageContent extends core_1.NativeClass {
}
exports.MessageContent = MessageContent;
class ComponentMessageContent extends MessageContent {
    constructor(_component) {
        super();
        this._component = _component;
    }
    static newFromJson(obj) {
        chai_1.expect(obj.component).to.be.an('object');
        const component = component_1.ComponentInfo.newFromJSON(obj.component);
        return new this(component);
    }
    get component() { return this._component; }
}
exports.ComponentMessageContent = ComponentMessageContent;
class ChannelMessageContent extends MessageContent {
    constructor(_component, _channel, _object, _parameters) {
        super();
        this._component = _component;
        this._channel = _channel;
        this._object = _object;
        this._parameters = _parameters;
    }
    static newFromJson(obj) {
        chai_1.expect(obj.component).to.be.an('object');
        chai_1.expect(obj.component).to.be.a('string');
        chai_1.expect(obj.channel).to.be.a('string');
        chai_1.expect(obj.object).to.be.a('string');
        return new this(obj.component, obj.channel, obj.object, Parameters.newFromJson(obj.parameters));
    }
    get component() { return this._component; }
    get channel() { return this._channel; }
    get object() { return this._object; }
    get parameters() { return this._parameters; }
}
exports.ChannelMessageContent = ChannelMessageContent;
class ControlMessageContent extends ChannelMessageContent {
}
exports.ControlMessageContent = ControlMessageContent;
class ObjectMessageContent extends ChannelMessageContent {
    constructor(component, channel, object, parameters) {
        chai_1.expect(object).to.be.ok;
        super(component, channel, object, parameters);
    }
}
exports.ObjectMessageContent = ObjectMessageContent;
class CreateMessageContent extends ObjectMessageContent {
}
exports.CreateMessageContent = CreateMessageContent;
class DestroyMessageContent extends ObjectMessageContent {
}
exports.DestroyMessageContent = DestroyMessageContent;
var HubMessageType;
(function (HubMessageType) {
    HubMessageType[HubMessageType["component"] = 0] = "component";
    HubMessageType[HubMessageType["control"] = 1] = "control";
    HubMessageType[HubMessageType["create"] = 2] = "create";
    HubMessageType[HubMessageType["destroy"] = 3] = "destroy";
})(HubMessageType = exports.HubMessageType || (exports.HubMessageType = {}));
class HubMessageContentParser extends core_1.MessageContentParser {
    constructor() {
        super(...arguments);
        this._contentClasses = {
            'component': ComponentMessageContent,
            'control': ControlMessageContent,
            'create': CreateMessageContent,
            'destroy': DestroyMessageContent
        };
    }
    parse(type, content) {
        if (!_.has(this._contentClasses, type))
            throw new Error('unsupported message type : ' + type);
        return this._contentClasses[type].newFromJson(content);
    }
}
exports.HubMessageContentParser = HubMessageContentParser;

//# sourceMappingURL=messaging.js.map
