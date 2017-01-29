"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("underscore");
var chai_1 = require("chai");
var core_1 = require("../core/core");
var component_1 = require("./component");
var Parameters = (function (_super) {
    __extends(Parameters, _super);
    function Parameters() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._values = {};
        return _this;
    }
    Parameters.newFromJson = function (obj) {
        chai_1.expect(obj).to.be.an('object');
        var parameters = new this();
        _.each(obj, function (value, key) {
            chai_1.expect(key).to.be.a('string');
            if (typeof value === 'number')
                value = [value];
            if (!_.isArray(value))
                throw new Error('value should be number or array');
            parameters.setParameter(key, value);
        });
        return parameters;
    };
    Parameters.prototype.getKeys = function () {
        return _.keys(this._settings);
    };
    Parameters.prototype.setParameter = function (key, value) {
        if (!key)
            throw new Error('invalid key');
        this._values[key] = value;
    };
    Parameters.prototype.getParameter = function (key) {
        if (!_.has(this._values, key))
            throw new Error('unknown key');
        return this._values[key];
    };
    return Parameters;
}(core_1.NativeClass));
exports.Parameters = Parameters;
var MessageContent = (function (_super) {
    __extends(MessageContent, _super);
    function MessageContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MessageContent;
}(core_1.NativeClass));
exports.MessageContent = MessageContent;
var ComponentMessageContent = (function (_super) {
    __extends(ComponentMessageContent, _super);
    function ComponentMessageContent(_component) {
        var _this = _super.call(this) || this;
        _this._component = _component;
        return _this;
    }
    ComponentMessageContent.newFromJson = function (obj) {
        chai_1.expect(obj.component).to.be.an('object');
        var component = component_1.ComponentInfo.newFromJSON(obj.component);
        return new this(component);
    };
    Object.defineProperty(ComponentMessageContent.prototype, "component", {
        get: function () { return this._component; },
        enumerable: true,
        configurable: true
    });
    return ComponentMessageContent;
}(MessageContent));
exports.ComponentMessageContent = ComponentMessageContent;
var ChannelMessageContent = (function (_super) {
    __extends(ChannelMessageContent, _super);
    function ChannelMessageContent(_component, _channel, object, parameters) {
        var _this = _super.call(this) || this;
        _this._component = _component;
        _this._channel = _channel;
        _this.object = object;
        _this.parameters = parameters;
        return _this;
    }
    ChannelMessageContent.newFromJson = function (obj) {
        chai_1.expect(obj.component).to.be.an('object');
        chai_1.expect(obj.component).to.be.a('string');
        chai_1.expect(obj.channel).to.be.a('string');
        chai_1.expect(obj.object).to.be.a('string');
        return new this(obj.component, obj.channel, obj.object, Parameters.newFromJson(obj.parameters));
    };
    Object.defineProperty(ChannelMessageContent.prototype, "component", {
        get: function () { return this._component; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelMessageContent.prototype, "channel", {
        get: function () { return this._channel; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelMessageContent.prototype, "object", {
        get: function () { return this._object; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelMessageContent.prototype, "parameters", {
        get: function () { return this._parameters; },
        enumerable: true,
        configurable: true
    });
    return ChannelMessageContent;
}(MessageContent));
exports.ChannelMessageContent = ChannelMessageContent;
var ControlMessageContent = (function (_super) {
    __extends(ControlMessageContent, _super);
    function ControlMessageContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ControlMessageContent;
}(ChannelMessageContent));
exports.ControlMessageContent = ControlMessageContent;
var ObjectMessageContent = (function (_super) {
    __extends(ObjectMessageContent, _super);
    function ObjectMessageContent(_component, _channel, object, parameters) {
        var _this = this;
        chai_1.expect(object).to.be.ok;
        _this = _super.call(this, component, channel, object, parameters) || this;
        return _this;
    }
    return ObjectMessageContent;
}(ChannelMessageContent));
exports.ObjectMessageContent = ObjectMessageContent;
var CreateMessageContent = (function (_super) {
    __extends(CreateMessageContent, _super);
    function CreateMessageContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateMessageContent;
}(ObjectMessageContent));
exports.CreateMessageContent = CreateMessageContent;
var DestroyMessageContent = (function (_super) {
    __extends(DestroyMessageContent, _super);
    function DestroyMessageContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DestroyMessageContent;
}(ObjectMessageContent));
exports.DestroyMessageContent = DestroyMessageContent;
var HubMessageType;
(function (HubMessageType) {
    HubMessageType[HubMessageType["component"] = 0] = "component";
    HubMessageType[HubMessageType["control"] = 1] = "control";
    HubMessageType[HubMessageType["create"] = 2] = "create";
    HubMessageType[HubMessageType["destroy"] = 3] = "destroy";
})(HubMessageType = exports.HubMessageType || (exports.HubMessageType = {}));
var HubMessageContentParser = (function (_super) {
    __extends(HubMessageContentParser, _super);
    function HubMessageContentParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._contentClasses = {
            'component': ComponentMessage,
            'control': ControlMessage,
            'create': CreateMessage,
            'destroy': DestroyMessage
        };
        return _this;
    }
    HubMessageContentParser.prototype.parse = function (type, content) {
        if (!_.has(MessageClasses, type))
            throw new Error('unsuported message type : ' + type);
        return MessageContentClasses[type].newFromJson(obj);
    };
    return HubMessageContentParser;
}(core_1.MessageContentParser));
exports.HubMessageContentParser = HubMessageContentParser;

//# sourceMappingURL=messaging.js.map
