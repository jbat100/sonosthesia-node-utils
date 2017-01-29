"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("underscore");
var Q = require("q");
var core_1 = require("../core/core");
var messaging_1 = require("./messaging");
var component_1 = require("./component");
var HubManager = (function (_super) {
    __extends(HubManager, _super);
    function HubManager(_configuration, _connector) {
        var _this = _super.call(this) || this;
        _this._configuration = _configuration;
        _this._connector = _connector;
        _this._messageContentParser = new messaging_1.HubMessageContentParser();
        _this._componentManager = new component_1.ComponentManager();
        return _this;
    }
    Object.defineProperty(HubManager.prototype, "configuration", {
        get: function () { return this._configuration; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HubManager.prototype, "connector", {
        get: function () { return this._connector; },
        enumerable: true,
        configurable: true
    });
    HubManager.prototype.setup = function () {
        return Q(null).then(function () {
        });
    };
    HubManager.prototype.teardown = function () {
        return Q(null).then(function () {
        });
    };
    HubManager.prototype.setupConnection = function (connection) {
        var _this = this;
        connection.messageObservable.subscribe(function (message) {
            message.parse(_this._messageContentParser);
        });
    };
    HubManager.prototype.getComponent = function (identifier) {
        _.find(this._components, function (component) { return component.identifier === identifier; });
    };
    return HubManager;
}(core_1.NativeClass));
exports.HubManager = HubManager;

//# sourceMappingURL=hub.js.map
