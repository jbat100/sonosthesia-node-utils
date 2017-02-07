"use strict";
const _ = require("underscore");
const chai_1 = require("chai");
const eventemitter3_1 = require("eventemitter3");
const uuid = require("node-uuid");
var ConnectorState;
(function (ConnectorState) {
    ConnectorState[ConnectorState["None"] = 0] = "None";
    ConnectorState[ConnectorState["Started"] = 1] = "Started";
    ConnectorState[ConnectorState["Stopped"] = 2] = "Stopped";
    ConnectorState[ConnectorState["Error"] = 3] = "Error";
})(ConnectorState = exports.ConnectorState || (exports.ConnectorState = {}));
class NativeClass {
    static cloneInstance(instance) {
        return Object.assign(Object.create(instance), instance);
    }
    static checkInstanceClass(instance, klass) {
        return chai_1.expect(instance).to.be.instanceof(klass);
    }
    get tag() { return this.constructor.name; }
}
exports.NativeClass = NativeClass;
class NativeEmitterClass extends eventemitter3_1.EventEmitter {
    get tag() { return this.constructor.name; }
}
exports.NativeEmitterClass = NativeEmitterClass;
class MessageContentParser extends NativeClass {
    parse(type, content) {
        throw new Error('not implemented');
    }
}
exports.MessageContentParser = MessageContentParser;
class Message extends NativeClass {
    constructor(_type, _date, _content) {
        super();
        this._type = _type;
        this._date = _date;
        this._content = _content;
        if (!this._date)
            this._date = new Date();
    }
    static checkJSON(obj) {
        chai_1.expect(obj.type).to.be.a('string');
        chai_1.expect(obj.date).to.be.a('string');
    }
    static newFromJSON(obj, parser) {
        this.checkJSON(obj);
        return new this(obj.type, new Date(obj.date), parser.parse(obj.type, obj.content));
    }
    get type() { return this._type; }
    get date() { return this._date; }
    get content() { return this._content; }
    get raw() {
        if (!this._raw)
            this._raw = JSON.stringify(this.toJSON());
        return this._raw;
    }
    toJSON() {
        return {
            type: this.type,
            date: this.date.toISOString(),
            content: this.content.toJSON()
        };
    }
}
exports.Message = Message;
class Declarable extends NativeClass {
    constructor(identifier) {
        super();
        this._live = true;
        this._identifier = identifier;
        this._live = true;
    }
    static create(identifier, info) {
        const instance = new this(identifier);
        instance.update(info);
        return instance;
    }
    get identifier() { return this._identifier; }
    get live() { return this._live; }
    set live(value) {
        this._live = value;
    }
    update(info) {
        this._info = info;
        this._applyInfo(info);
    }
    createReference() {
        throw new Error('unimplemented');
    }
    _applyInfo(info) {
    }
}
exports.Declarable = Declarable;
class Info extends NativeClass {
    static newFromJSON(obj) {
        const instance = new this();
        instance.applyJSON(obj);
        return instance;
    }
    get identifier() { return this._identifier; }
    applyJSON(obj) {
        chai_1.expect(obj.identifier).to.be.a('string');
        this._identifier = obj.identifier;
    }
    toJSON() {
        return _.pick(this, 'identifier');
    }
}
exports.Info = Info;
class Selection {
    constructor() {
        this._identifier = null;
        this._valid = false;
    }
    get identifier() { return this._identifier; }
    set identifier(identifier) { this._identifier = identifier; }
    get valid() { return this._valid; }
    set valid(valid) { this._valid = valid; }
}
exports.Selection = Selection;
class Range extends NativeClass {
    constructor(_min, _max) {
        super();
        this._min = _min;
        this._max = _max;
    }
    static newFromJSON(obj) {
        chai_1.expect(obj).to.be.an('object');
        const instance = new this(+obj.min, +obj.max);
        instance.check();
        return instance;
    }
    get min() { return this._min; }
    set min(min) { this._min = min; }
    get max() { return this._max; }
    set max(max) { this._max = max; }
    check() { if (this._min > this._max)
        throw new Error('min should be less than max'); }
    toJSON() {
        return _.pick(this, 'min', 'max');
    }
}
exports.Range = Range;
class GUID extends NativeClass {
    static generate() {
        return uuid.v4();
    }
}
exports.GUID = GUID;

//# sourceMappingURL=core.js.map
