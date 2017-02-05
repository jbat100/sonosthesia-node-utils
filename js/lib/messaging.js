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
    static newFromJSON(obj) {
        const parameters = new this();
        if (obj) {
            chai_1.expect(obj).to.be.an('object');
            _.each(obj, (value, key) => {
                chai_1.expect(key).to.be.a('string');
                if (typeof value === 'number')
                    value = [value];
                if (!_.isArray(value))
                    throw new Error('value should be number or array');
                parameters.setParameter(key, value);
            });
        }
        return parameters;
    }
    toJSON() {
        return this._values;
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
    toJSON() {
        return {};
    }
}
exports.MessageContent = MessageContent;
class ComponentMessageContent extends MessageContent {
    constructor(_component) {
        super();
        this._component = _component;
    }
    static newFromJSON(obj) {
        chai_1.expect(obj.component).to.be.an('object');
        const component = component_1.ComponentInfo.newFromJSON(obj.component);
        return new this(component);
    }
    toJSON() {
        return {
            component: this.component.toJSON()
        };
    }
    get component() { return this._component; }
}
exports.ComponentMessageContent = ComponentMessageContent;
class ChannelMessageContent extends MessageContent {
    constructor(_component, _channel, _instance, _key, _parameters) {
        super();
        this._component = _component;
        this._channel = _channel;
        this._instance = _instance;
        this._key = _key;
        this._parameters = _parameters;
    }
    static checkJSON(obj) {
        chai_1.expect(obj.component).to.be.a('string');
        chai_1.expect(obj.channel).to.be.a('string');
        if (obj.instance)
            chai_1.expect(obj.instance).to.be.a('string');
        if (obj.key)
            chai_1.expect(obj.key).to.be.a('string');
    }
    static newFromJSON(obj) {
        this.checkJSON(obj);
        const parameters = Parameters.newFromJSON(obj.parameters);
        return new this(obj.component, obj.channel, obj.instance, obj.key, parameters);
    }
    toJSON() {
        return {
            component: this.component,
            channel: this.channel,
            instance: this.instance,
            key: this.key,
            parameters: (this.parameters ? this.parameters.toJSON() : null)
        };
    }
    get component() { return this._component; }
    get channel() { return this._channel; }
    get instance() { return this._instance; }
    get key() { return this._key; }
    get parameters() { return this._parameters; }
    isInstanceMessage() { return this.instance != null; }
}
exports.ChannelMessageContent = ChannelMessageContent;
class ControlMessageContent extends ChannelMessageContent {
}
exports.ControlMessageContent = ControlMessageContent;
class ActionMessageContent extends ChannelMessageContent {
    static checkJSON(obj) {
        super.checkJSON(obj);
        chai_1.expect(obj.key).to.be.a('string');
    }
}
exports.ActionMessageContent = ActionMessageContent;
class InstanceMessageContent extends ChannelMessageContent {
    static checkJSON(obj) {
        super.checkJSON(obj);
        chai_1.expect(obj.instance).to.be.a('string');
    }
}
exports.InstanceMessageContent = InstanceMessageContent;
class CreateMessageContent extends InstanceMessageContent {
}
exports.CreateMessageContent = CreateMessageContent;
class DestroyMessageContent extends InstanceMessageContent {
}
exports.DestroyMessageContent = DestroyMessageContent;
var HubMessageType;
(function (HubMessageType) {
    HubMessageType[HubMessageType["Component"] = 0] = "Component";
    HubMessageType[HubMessageType["Action"] = 1] = "Action";
    HubMessageType[HubMessageType["Control"] = 2] = "Control";
    HubMessageType[HubMessageType["Create"] = 3] = "Create";
    HubMessageType[HubMessageType["Destroy"] = 4] = "Destroy";
})(HubMessageType = exports.HubMessageType || (exports.HubMessageType = {}));
const HubMessageContentClasses = new Map();
HubMessageContentClasses[HubMessageType.Component] = ComponentMessageContent;
HubMessageContentClasses[HubMessageType.Control] = ControlMessageContent;
HubMessageContentClasses[HubMessageType.Action] = ActionMessageContent;
HubMessageContentClasses[HubMessageType.Create] = CreateMessageContent;
HubMessageContentClasses[HubMessageType.Destroy] = DestroyMessageContent;
class HubMessage extends core_1.Message {
    static newFromJSON(obj, parser) {
        this.checkJSON(obj);
        const hubMessageType = HubMessageType[obj.type];
        return new this(hubMessageType, new Date(obj.date), parser.parse(obj.type, obj.content));
    }
    constructor(type, date, content) {
        const expectedContentClass = HubMessageContentClasses[type];
        if (!expectedContentClass)
            throw new Error('unsupported message type : ' + type);
        chai_1.expect(content).to.be.instanceOf(expectedContentClass);
        super(HubMessageType[type], date, content);
    }
}
exports.HubMessage = HubMessage;
class HubMessageContentParser extends core_1.MessageContentParser {
    parse(typeStr, content) {
        const type = HubMessageType[typeStr];
        const contentClass = HubMessageContentClasses[type];
        if (!contentClass)
            throw new Error('unsupported message type : ' + type);
        return contentClass.newFromJSON(content);
    }
}
exports.HubMessageContentParser = HubMessageContentParser;

//# sourceMappingURL=messaging.js.map
